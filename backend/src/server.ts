import app from "./app.js";
const PORT = 3000;

async function start() {
  try {
    app.listen(PORT, () => {
      console.log("Server started successfully....123");
    });
  } catch (err) {
    console.error("Failed to start server: ", err);
  }
}

start();
