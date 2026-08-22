import express, { type Express, type Request, type Response } from "express";
import urlRouter from "./routes/urls.route";
import serviceRouter from "./services/url.service";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());


/**
 * Core Product API
 */
app.use('/api/v1', urlRouter);
app.use(serviceRouter);

app.listen(3000, () => {
  console.log("Listening on port http://localhost:3000");
});
