import mongoose from "mongoose";
import config from "./config.js";

export async function configDB() {
  try {
    mongoose.connect(config.DB_URI);
    console.log("Database connected successfully....");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
}
