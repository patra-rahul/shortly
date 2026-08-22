import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";

export async function urls(req: Request, res: Response) {
  const { originalUrl } = req.body;

  const url = await prisma.url.create({
    data: {
      originalUrl: originalUrl,
    },
  });

  if(!url){
    return res.status(400).json({
        message: 'Failed to generate a Short Url'
    })
  }

  res.status(200).json({
    message: 'Short Url Generated Successfully',
    data: url
  })
}

