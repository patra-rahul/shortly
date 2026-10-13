import express from "express";
import type { Request, Response } from "express";

import api from "./api/api.routes.js";

const app = express();

app.use("/api/v1", api);

app.get("/", (req: Request, res: Response) => {
  res.send("App Started Successfullly...");
});

export default app;
