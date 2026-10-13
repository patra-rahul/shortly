import app from "./app.js";
const PORT = 3000;
import { configDB } from "./config/config.db.js";

async function start() {
  try {
    app.listen(PORT, () => {
      console.log("Server started successfully....");
    });
  } catch (err) {
    console.error("Failed to start server: ", err);
  }
}

start();
configDB();
