import { type Request, type Response } from "express";
import {prisma} from '../../lib/prisma'

export async function dashboard(req: Request, res: Response) {
  res.send(200).json({
    message: "Dashboard authorized...",
  });
}

export async function redirectUrl(req: Request, res: Response) {
  const shortUrl = String(req.params.id);

  const url = await prisma.url.findUnique({
    where: {
      shortUrl: shortUrl,
    },
  });

  if (!url) {
    return res.status(404);
  }

  res.status(302).redirect(url.originalUrl);
}
