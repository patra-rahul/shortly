import { type Request, type Response, type NextFunction } from "express";
import crypto from "node:crypto";
import { prisma } from "../../lib/prisma";

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  currentUser?: User;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const sessionToken = req.cookies.session;

  if (!sessionToken) {
    return res.status(401).json({
      error: {
        code: "UNAUTHENTICATED",
        message: "You must be logged in",
      },
    });
  }

  const sessionTokenHash = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const session = await prisma.session.findUnique({
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
        code: "INVALID_SESSION",
        message: "Your session is invalid",
      },
    });
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return res.status(400).json({
      error: {
        code: "SESSION_EXPIRED",
        message: "Your session has expired, try logging in again..",
      },
    });
  }
  req.currentUser = session.user;
  next();
}
