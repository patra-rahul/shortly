import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import redis from "../../lib/redis";

export async function dashboard(req: Request, res: Response) {
  res.send(200).json({
    message: "Dashboard authorized...",
  });
}

function key(shortUrl: string) {
  return `url:${shortUrl}`;
}

export async function redirectUrl(req: Request, res: Response) {
  try {
    console.log("REDIRECT HIT", new Date().toISOString());
    const shortUrl = String(req.params.id);

    const cache = await redis.get(key(shortUrl));

    // Cache HIT:
    if (cache) {
      console.log(`Cache Hit: ${key(shortUrl)}`);
      return res.redirect(302, cache);
    }

    // Cache Miss:
    console.log(`Cache Miss: ${key(shortUrl)}`);

    const url = await prisma.url.findUnique({
      where: {
        shortUrl,
      },
      select: {
        originalUrl: true,
      },
    });

    if (!url) {
      return res.status(404).json({
        error: {
          code: "URL_NOT_FOUND",
          message: "Such Short URL does not exist",
        },
      });
    }

    console.log({
      method: req.method,
      url: req.originalUrl,
      userAgent: req.headers["user-agent"],
      referer: req.headers.referer,
    });

    await redis.set(key(shortUrl), url.originalUrl, {
      EX: 60 * 60 // 1 Hour
    });
    return res.redirect(302, url.originalUrl);
  } catch (err) {
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}
