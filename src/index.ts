import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (_, res) => {
  res.send("Backend is running");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
