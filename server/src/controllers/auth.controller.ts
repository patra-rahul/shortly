import { type Request, type Response } from "express";
import * as oidc from "openid-client";
import googleConfig from "../../lib/google";
import crypto from "node:crypto";
import { prisma } from "../../lib/prisma";

export async function register(req: Request, res: Response) {}

export async function google(req: Request, res: Response) {
  const state = String(oidc.randomState());
  const codeVerifier = String(oidc.randomPKCECodeVerifier());

  res.cookie("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("oauth_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  const codeChallenge = await oidc.calculatePKCECodeChallenge(codeVerifier);
  const authorizationUrl = oidc.buildAuthorizationUrl(googleConfig, {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    scope: "openid email profile",
    response_type: "code",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  console.log("state: ", state);
  console.log("codeVerifier: ", codeVerifier);

  return res.redirect(authorizationUrl.href);
}

export async function googleCallback(req: Request, res: Response) {
  try {
    const { code, state } = req.query;

    if (typeof code !== "string") {
      return res.status(400).json({
        error: {
          code: "MISSING_AUTHORIZATION_CODE",
          message: "Google did not provide an authorization code.",
        },
      });
    }
    if (typeof state !== "string") {
      return res.status(400).json({
        error: {
          code: "MISSING_OAUTH_STATE",
          message: "OAuth State is missing.",
        },
      });
    }

    const storedState = req.cookies.oauth_state;
    const codeVerifier = req.cookies.oauth_code_verifier;

    if (!storedState || !codeVerifier) {
      return res.status(400).json({
        error: {
          code: "OAUTH_SESSION_EXPIRED",
          message: "OAuth Session has expired. Please try again.",
        },
      });
    }

    // verify state:
    if (state !== storedState) {
      return res.status(400).json({
        error: {
          code: "INVALID_OAUTH_STATE",
          message: "Invalid OAuth State.",
        },
      });
    }

    // exchange auth code for tokens
    const tokens = await oidc.authorizationCodeGrant(
      googleConfig,
      new URL(req.originalUrl, `${req.protocol}://${req.get("host")}`),
      {
        pkceCodeVerifier: codeVerifier,
        expectedState: storedState,
      },
    );

    const claims = tokens.claims();
    if (!claims) {
      return res.status(400).json({
        error: {
          code: "MISSING_IDENTITY",
          message: "Google did not provide identity information",
        },
      });
    }

    const providerAccountId = claims.sub;
    const email = String(claims.email);

    if (!email) {
      return res.status(400).json({
        error: {
          code: "EMAIL_NOT_PROVIDED",
          message: "Google did not provide an email address",
        },
      });
    }

    // Find / Create user account
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "google",
          providerAccountId,
        },
      },
      include: {
        user: true,
      },
    });

    let user;
    if (account) {
      user = account.user;
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name: typeof claims.name === "string" ? claims.name : null,

          accounts: {
            create: {
              provider: "google",
              providerAccountId,
            },
          },
        },
      });
    }

    res.clearCookie("oauth_state");
    res.clearCookie("oauth_code_verifier");

    // create Session:
    const sessionToken = crypto.randomBytes(32).toString("hex");

    const sessionTokenHash = crypto
      .createHash("sha256")
      .update(sessionToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

    await prisma.session.create({
      data: {
        tokenHash: sessionTokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    res.cookie("session", sessionToken, {
      httpOnly: true, // hides from the client side, only server side allowed
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (err) {
    console.error("Google OAuthError: ", err);
    return res.status(500).json({
      error: {
        code: "GOOGLE_AUTH_FAILED",
        message: "Unable to authentication with Google",
      },
    });
  }
}

export async function logout(req: Request, res: Response) {
  const sessionToken = req.cookies.session;

  const sessionTokenHash = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const session = await prisma.session.delete({
    where: {
      tokenHash: sessionTokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return res.status(401).json({
      error: {
        code: "SESSION_NOT_FOUND",
        message: "No such session found for this user",
      },
    });
  }
  
  res.clearCookie("session");
  res.redirect(`${process.env.FRONTEND_URL}`);
}
