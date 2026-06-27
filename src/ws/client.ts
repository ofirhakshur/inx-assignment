import WebSocket from "ws";

export const connectWebSocket = (token: string, apiKeyId: string) => {
  const ws = new WebSocket("wss://gw-client-api-ws.uat.inx.co", {
    headers: {
      authorization: token,
      apiKey: apiKeyId,
    },
  });

  ws.on("open", () => {
    console.log("✅ WebSocket connected");
  });

  ws.on("error", (err) => {
    console.error("❌ WebSocket error:", err);
  });

  ws.on("close", () => {
    console.log("❌ WebSocket closed");
  });

  ws.on("message", (data) => {
    console.log("📩", data.toString());
  });

  return ws;
};
