import { type Request, type Response } from "express";

export async function createUrl(req: Request, res: Response){
    const {long_url, alias} = req.body;
}