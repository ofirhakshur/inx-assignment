import { OrderBook } from "../orderbook/OrderBook";

export const handleMessage = (orderBook: OrderBook) => {
  return (msg: any) => {
    if (msg.event === "orderBook/subscribeOrderBook") {
      return;
    }

    if (msg.event === "ORDER_BOOK") {
      const buy = msg.buy ?? [];
      const sell = msg.sell ?? [];

      buy.forEach((b: any) => {
        orderBook.update("buy", b.price, b.amount);
      });

      sell.forEach((a: any) => {
        orderBook.update("sell", a.price, a.amount);
      });
    }
  };
};
