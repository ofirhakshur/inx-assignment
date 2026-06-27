export class OrderBook {
  bids: Map<number, number>;
  asks: Map<number, number>;

  constructor() {
    this.bids = new Map();
    this.asks = new Map();
  }

  update(side: "buy" | "sell", price: number, amount: number) {
    const book = side === "buy" ? this.bids : this.asks;

    if (amount === 0) {
      book.delete(price);
      return;
    }

    book.set(price, amount);
  }

  getBestBid(): number | null {
    if (this.bids.size === 0) return null;
    return Math.max(...this.bids.keys());
  }

  getBestAsk(): number | null {
    if (this.asks.size === 0) return null;
    return Math.min(...this.asks.keys());
  }

  getState() {
    return {
      bids: Array.from(this.bids.entries()),
      asks: Array.from(this.asks.entries()),
    };
  }

  getStats() {
    const bestBid = this.getBestBid();
    const bestAsk = this.getBestAsk();

    if (bestBid === null || bestAsk === null) {
      return {
        bestBid,
        bestAsk,
        spread: null,
        midPrice: null,
      };
    }

    return {
      bestBid,
      bestAsk,
      spread: bestAsk - bestBid,
      midPrice: (bestAsk + bestBid) / 2,
    };
  }

  applySnapshot(snapshot: any) {
    this.bids.clear();
    this.asks.clear();

    snapshot.buy?.forEach((b: any) => {
      this.bids.set(b.price, b.amount);
    });

    snapshot.sell?.forEach((a: any) => {
      this.asks.set(a.price, a.amount);
    });
  }
}
