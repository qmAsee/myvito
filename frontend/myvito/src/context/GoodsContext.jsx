import { useState, useEffect, useContext, createContext } from "react";
import { fakeFetchGoods } from "../api";

const GoodsContext = createContext({
  goods: [],
  isLoading: false,
});

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export function GoodsContextProvider({ children }) {
  const [goods, setGoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function preload() {
      setIsLoading(true)
      const result = await fakeFetchGoods();
      setGoods(result);
      setIsLoading(false)
    }
    preload();
  }, []);

  function createGood(newGood) {
    setGoods(prev => [...prev, newGood], goods)
  }

  return (
    <GoodsContext.Provider value={{ goods, isLoading, createGood }}>{children}</GoodsContext.Provider>
  );
}

export default GoodsContext;

export function useGoods() {
  return useContext(GoodsContext);
}
