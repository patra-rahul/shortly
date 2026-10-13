import dotenv from "dotenv";
dotenv.config();

type Config = {
  PORT: number;
  DB_URI: string;
};

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URI: String(process.env.DB_URI),
};

if (!config.DB_URI) {
  console.error("Error: DB_URI not specified in ENV file");
}

export default config;
