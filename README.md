# INX Order Book Backend

Real-time backend service for BTC/USD order book using INX WebSocket API.

## What it does

- Connects to INX WebSocket feed
- Maintains in-memory order book (bids/asks)
- Handles snapshot + delta updates
- Exposes REST API for frontend

---

## Tech Stack

- Node.js
- TypeScript
- Express
- WebSocket

---

## How to run

npm install
npm run dev

---

## Environment variables

PORT=3000
INX_API_KEY_ID=your_api_key_id
INX_PRIVATE_KEY=your_private_key
INX_PUBLIC_KEY=your_public_key

---

## API

GET /api/orderbook
Returns full order book:

{
"bids": [[price, amount]],
"asks": [[price, amount]]
}

---

GET /api/orderbook/stats
Returns:

{
"bestBid": number,
"bestAsk": number,
"spread": number,
"midPrice": number
}

---

## Order Book logic

- Snapshot replaces full state
- Deltas update price levels
- amount = 0 removes level
- Data stored in Map for fast updates

---

## Architecture

INX WebSocket → Backend OrderBook → REST API → Frontend
