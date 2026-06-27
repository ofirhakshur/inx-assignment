import express from "express";
import dotenv from "dotenv";
import { createWebSocketToken } from "./services/inx/auth";
import { connectWebSocket } from "./ws/client";
import { OrderBook } from "./orderbook/OrderBook";
import { handleMessage } from "./ws/handler";

dotenv.config();

const app = express();

app.get("/", (_, res) => {
  res.send("Backend is running");
});

const testAuth = async () => {
  try {
    const orderBook = new OrderBook();

    const token = await createWebSocketToken();

    connectWebSocket(
      token,
      process.env.INX_API_KEY_ID!,
      handleMessage(orderBook),
    );
  } catch (err) {
    console.error("❌ auth failed:", err);
  }
};
testAuth();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
