import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createWebSocketToken } from "./services/inx/auth";
import { connectWebSocket } from "./ws/client";
import { OrderBook } from "./orderbook/OrderBook";
import { handleMessage } from "./ws/handler";

dotenv.config();

const app = express();
app.use(cors());

const orderBook = new OrderBook();

app.get("/", (_, res) => {
  res.send("Backend is running");
});

app.get("/api/orderbook", (req, res) => {
  res.json(orderBook.getState());
});

app.get("/api/orderbook/stats", (req, res) => {
  res.json(orderBook.getStats());
});

const testAuth = async () => {
  try {
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
