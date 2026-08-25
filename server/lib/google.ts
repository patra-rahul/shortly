import * as oidc from "openid-client";
import dotenv from "dotenv";
dotenv.config();

const googleConfig = await oidc.discovery(
  new URL("https://accounts.google.com"),
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
);

export default googleConfig;