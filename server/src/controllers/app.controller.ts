import { type Request, type Response } from "express";

export async function dashboard(req: Request, res: Response){
    res.send(200).json({
        message: "Dashboard authorized..."
    })
}