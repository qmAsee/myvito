import goods from "./data";

export function fakeFetchGoods() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(goods);
    }, 1000);
  });
}
