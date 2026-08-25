import express, { type Express, type Request, type Response } from "express";
import urlRouter from "./routes/urls.route";
import serviceRouter from "./services/url.service";
import authRouter from "./routes/auth.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./routes/app.route";

const app: Express = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

/**
 * Core Product API
 */

app.use("/api/v1", urlRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/app", appRouter)
app.use(serviceRouter);

app.listen(3000, () => {
  console.log("Listening on port http://localhost:3000");
});
