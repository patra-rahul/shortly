import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import { generateShortCode } from "../utils/generateShortCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { AuthenticatedRequest } from "../middlewares/authorization.middleware";
import dotenv from "dotenv";
dotenv.config;

export async function urls(req: AuthenticatedRequest, res: Response) {
  try {
    const user = req.currentUser;
    const { shortUrl, originalUrl } = req.body;
    if (!shortUrl){
      const code = generateShortCode();
    }
    const code = shortUrl;
    const url = await prisma.url.create({
      data: {
        id: code,
        shortUrl: code,
        originalUrl: originalUrl,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
      include: {
        user: true,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        type UniqueConstraintMeta = {
          driverAdapterError?: {
            cause?: {
              constraint?: {
                fields?: string;
              };
            };
          };
        };
        const meta = e.meta as UniqueConstraintMeta;
        const field = meta.driverAdapterError?.cause?.constraint?.fields?.[0];
        const normalizedField = field?.replaceAll('""', "");
        if (normalizedField?.includes("originalUrl")) {
          return res.status(409).json({
            error: {
              code: "ORIGINAL_URL_EXISTS",
              message: "This URL has already been shortened.",
            },
          });
        } else if (field?.includes("shortUrl")) {
          return res.status(409).json({
            error: {
              code: "SHORT_URL_EXISTS",
              message: "This URL has already been shortened.",
            },
          });
        }
        return res.status(500).json({
          e: e.meta,
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong.",
          },
        });
      }
    }
  }
}

export async function getUrl(req: AuthenticatedRequest, res: Response) {
  try {
    const id = String(req.params.id);

    const url = await prisma.url.findUnique({
      where: {
        id,
      },
    });

    if (!url) {
      return res.status(409).json({
        error: {
          code: "URL_DOES_NOT_EXIST",
          message: "No Such URL shortened yet",
        },
      });
    }
    res.status(200).json({ url });
  } catch (e) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}

export async function getUrls(req: AuthenticatedRequest, res: Response) {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const [urls, totalItems] = await Promise.all([
      prisma.url.findMany({
        where: {
          userId: req.currentUser?.id,
        },
        skip: page * limit,
        take: limit || 10,
        orderBy: {
          updatedAt: "desc",
        },
      }),

      prisma.url.count({
        where: {
          userId: req.currentUser?.id,
        },
      }),
    ]);

    if (!urls) {
      return res.status(401).json({
        error: {
          code: "URLS_NOT_FOUND",
          message: "There are no urls in the database",
        },
      });
    }
    return res.status(200).json({ urls, totalItems });
  } catch (e) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}

export async function updateUrl(req: AuthenticatedRequest, res: Response) {
  const user = req.currentUser;
  const id = String(req.params.id);
  const { newShortUrl, newOriginalUrl } = req.body;
  const url = await prisma.url.update({
    where: {
      id: id,
    },
    data: {
      shortUrl: newShortUrl,
      originalUrl: newOriginalUrl,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
    include: {
      user: true,
    },
  });
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
}

export async function deleteUrl(req: AuthenticatedRequest, res: Response) {
  try {
    const id = String(req.params.id);

    const url = await prisma.url.delete({
      where: {
        id,
      },
    });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (e) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}