import crypto from "crypto";

export const createWebSocketToken = async () => {
  const apiKeyId = process.env.INX_API_KEY_ID!;
  const privateKey = process.env.INX_PRIVATE_KEY!;

  const timestamp = Date.now();
  const nonce = timestamp;

  const context = {
    nonce: nonce,
    timestamp: Date.now(),
    apiKeyId,
  };
  const contextData = Buffer.from(JSON.stringify(context));
  const signedContext = crypto
    .sign("sha256", contextData, privateKey)
    .toString("base64");

  const response = await fetch(
    "https://gw-client-api-rest.uat.inx.co/api/createToken",
    {
      method: "POST",
      headers: {
        nonce: nonce.toString(),
        timestamp: timestamp.toString(),
        apiKeyId,
        signedContext,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`INX auth failed: ${err}`);
  }

  const data = await response.json();

  return data.websocketToken;
};
