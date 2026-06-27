import crypto from "crypto";

export const createWebSocketToken = async () => {
  const apiKeyId = "6a3f9c66bfe977a58de365b4";
  const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDf74sZVjyntdVJ
MibjpfqrzbK95EcxUoMpHtcIPrLiZgMwnP0Aiowuq9oTjRylFvnTBtxE3xQ/fLhG
kC/UgxDNIlk13favKWyxVQVNogBuYIar4Nxbm59LlfRIFKQY064sO2ZQlNgIR3Bl
dVjUBtTHFEkZNplj8XFwx9gV55TEKGtWuIw1DdwzWEOuQZgaN8RuFc2Ji5gqrERc
6GJHdN+DPgy0s6+2D3ULfjImPMr04EojMzxQboS7WdoGJoJWUUPtDnEyPQxpsz3I
6PosU5z+2NINIDULagCdtirHlguzfjvopR+m6iAqTj0OSYbDdP/UAlWRnJdssYVA
fIe6sXcVAgMBAAECggEABFiXOUMTyHMjuXjcSYZENsHg/RpOqb3OzFqWyfLs5gPH
U5H0ahEw9nXrif4ZhyMKmbEez2+0lPqEGWB9K9FttHbScZRw0BuhylDwBP6cJghA
Yi+/bxVhMnvC+C7TCXqlknew/RGKc3dZeSqdck39+ALO3Ar+ep1UujTdXtLLWmw0
xDExqJ/1eMpAqqQ7YxpxwdFyd0+V78yXhwrx/yfZjHCsuPFBcGJq7JFvg3kRiz42
gCYNjMMKcZa0O3ue4cQo65DjPgEPe6M74UlbGgLSMwyyctc4gHXN0VCqKAXAfION
mO8JC8ndNYIkUOrfLAfvqOpt8P+zJ6NDFu7X3wsPQQKBgQD2oF0BFNECBH+28iyM
hOEF5mModAFSCnCbweJeihk9d073VkAywFmovFVccyMoGO1LRgH/fMkxuFKG9NGY
Vdkl8AfPjKqvSkG4vZi1d0Qj7BEZt9tG06kBPj1ZHDXYkK+Dj1gyq6xwzD4sbUbR
p9NQI1apXkRdL97F8DJFgW2ZQQKBgQDocmcuG6st/u6H0yo5J3H6POsHBIW2V0Zg
rKPjFHSQ9s5LPFcQ0MWvzHZTDz+9dwKpliZP7zfs9Udl8xY2OPNs26MGK32AUnjp
sT9iVnHvnU8b1lVzHvPp3QBlyLZ1mkEAvfFeQ+9GD65Q7FCy4UZWgawwFMGt6tJu
5m9dka/01QKBgFTOgCzHA7g149T9IeSQLPDicGaQvYOAo4hr+3OW+Wbxh+31cs4A
5tPnL1NDJGu9ZpvjzvwT5Pt77qUJuqkvnCQ3jfgI3wi3+DGWwNRl1sCjhJ3bY0PP
tOYAiQgDc2CtIC2VNTb3YazIDvkn+ppNo5SDEmHbUJbaxzg5iI/uGcoBAoGAXuto
qvFtg4jYyuo2EcTDzFXX+7OjDoSxHoUhH3eY6iF+uEZZn2pBb7pkjyJo+uuAUNQZ
rQaYpdC7aSxM47N54/gEqF5WD3KeIX/ZzERUnm50gX+SwUHghJ1Urju6Fmf5J15p
E/9V1BxPKIh3o7ROTsEBGVlAhc6gQ90hmOoHGkkCgYEAtKY2dc1BKi7AtihqsAsh
IohIh4J1oPBjZm+dCDBFNy0EKu/CYLcbVf9YelSaVSYkY4losRfL7riMsxU0zNpM
Be8nJqevFSuFdNW9s5eOXTgqfSMvdlm0hLys2W19ZBmTwfb6k5yFLKKRJoWbzY/U
xv5jz7waqe6gfCqGW/J8tsQ=
-----END PRIVATE KEY-----`;

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
        apiKeyId: apiKeyId,
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

  console.log("token response:", data);

  return data.websocketToken;
};
