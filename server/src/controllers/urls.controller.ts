import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import { generateShortCode } from "../utils/generateShortCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export async function urls(req: Request, res: Response) {
  try {
    const { shortUrl, originalUrl } = req.body;
    const code = shortUrl ?? generateShortCode();
    const url = await prisma.url.create({
      data: {
        id: code,
        shortUrl: code,
        originalUrl: originalUrl,
      },
    });
    res.status(201).json({
      message: "Short Url Generated Successfully",
      data: url,
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

export async function getUrl(req: Request, res: Response) {
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
    res.status(200).json({
      url,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}

export async function getUrls(req: Request, res: Response) {
  try {
    const { cursor, limit } = req.query;

    const firstPage = await prisma.url.findMany({
      take: Number(limit) || 10,
      orderBy: {
        createdAt: "asc",
      },
    });

    const lastUrl = firstPage[firstPage.length - 1];

    const nextPage = lastUrl
      ? await prisma.url.findMany({
          take: Number(limit) || 10,
          cursor: {
            id: String(cursor),
          },
          orderBy: {
            createdAt: "asc",
          },
        })
      : [];

    res.status(200).json(nextPage);
  } catch (e) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}

export async function updateUrl(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const { newUrl } = req.body;

    const oldUrl = await prisma.url.findUnique({
      where: {
        id,
      },
    });

    if (oldUrl?.originalUrl == newUrl) {
      return res.status(401).json({
        error: {
          code: "URL_ALREADY_EXISTS",
          message: "The new URL is same as the original URL",
        },
      });
    }
    const url = await prisma.url.update({
      where: {
        id,
      },
      data: {
        originalUrl: newUrl,
      },
    });

    res.status(201).json(url);
  } catch (e) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}

export async function deleteUrl(req: Request, res: Response) {
  try {
    const id = String(req.params.id);

    const url = await prisma.url.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      msg: `Deleted url with id: ${url.id} successfully...`,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}

export async function redirectUrl(req: Request, res: Response) {
  const id = String(req.params.id);

  const url = await prisma.url.findUnique({
    where: {
      id,
    },
  });

  if (!url) {
    return res.status(404);
  }

  res.redirect(url.originalUrl);
}

