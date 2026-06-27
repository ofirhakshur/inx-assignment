import express from "express";
import dotenv from "dotenv";
import { createWebSocketToken } from "./services/inx/auth";

dotenv.config();

const app = express();

app.get("/", (_, res) => {
  res.send("Backend is running");
});

const testAuth = async () => {
  try {
    const token = await createWebSocketToken();
    console.log("🔥 websocketToken:", token);
  } catch (err) {
    console.error("❌ auth failed:", err);
  }
};
testAuth();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
