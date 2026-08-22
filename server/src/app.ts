import express, { type Express, type Request, type Response } from "express";
import urlRouter from "./routes/urls.route";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());


/**
 * POST api/v1/urls
 */
app.use('/api/v1', urlRouter);

app.listen(3000, () => {
  console.log("Listening on port http://localhost:3000");
});
