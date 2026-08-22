import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import { generateShortCode } from "../utils/generateShortCode";

export async function urls(req: Request, res: Response) {
  try {
    const { shortUrl, originalUrl } = req.body;

    if (shortUrl) {
      const url = await prisma.url.create({
        data: {
          id: shortUrl,
          shortUrl: shortUrl,
          originalUrl: originalUrl,
        },
      });

      if (!url) {
        return res.status(400).json({
          msg: "Short Code or the Original Url Already Exists",
        });
      }
      return res.status(200).json({
        message: "Short Url Generated Successfully",
        data: url,
      });
    }

    const code = generateShortCode();
    const url = await prisma.url.create({
      data: {
        id: code,
        shortUrl: code,
        originalUrl: originalUrl,
      },
    });
    if (!url) {
      return res.status(400).json({
        message: "The original Url already exists",
      });
    }
    res.status(200).json({
      message: "Short Url Generated Successfully",
      data: url,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Failed to do so",
      error: e,
    });
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

    res.status(200).json({
      url,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Failed to do so",
      error: e,
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
    res.status(400).json({
      msg: "Failed to do so",
      error: e,
    });
  }
}
