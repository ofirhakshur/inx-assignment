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
