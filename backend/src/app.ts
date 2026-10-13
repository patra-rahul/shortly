import express from "express";
import type { Request, Response } from "express";

/**
 * ROUTERS
 */
import api from "./api/api.routes.js";
import auth from "./auth/routes.auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", api);
app.use("/auth/v1", auth);

app.get("/", (req: Request, res: Response) => {
  res.send("App Started Successfullly...");
});

export default app;
