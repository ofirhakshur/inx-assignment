import WebSocket from "ws";

export const connectWebSocket = (
  token: string,
  apiKeyId: string,
  onMessage: (data: any) => void,
) => {
  const ws = new WebSocket("wss://gw-client-api-ws.uat.inx.co", {
    headers: {
      authorization: token,
      apiKey: apiKeyId,
    },
  });

  ws.on("open", () => {
    console.log("✅ WebSocket connected");

    ws.send(
      JSON.stringify({
        event: "orderBook/subscribeOrderBook",
        data: {
          marketName: "BTC-USD",
          depth: 20,
          clientRequestId: crypto.randomUUID(),
        },
      }),
    );
  });

  ws.on("error", (err) => {
    console.error("❌ WebSocket error:", err);
  });

  ws.on("close", () => {
    console.log("❌ WebSocket closed");
  });

  ws.on("message", (data) => {
    const parsed = JSON.parse(data.toString());
    onMessage(parsed);
  });

  return ws;
};
