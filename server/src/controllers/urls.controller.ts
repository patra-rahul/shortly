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
        error: e
    })
  }
}

export async function getUrl(req: Request, res: Response) {
  const id = Number(req.params.id);
}
