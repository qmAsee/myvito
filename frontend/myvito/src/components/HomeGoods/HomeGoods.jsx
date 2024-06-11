import { useState } from "react";

import GoodCard from "../GoodCard/GoodCard";
import { useGoods } from "../../context/GoodsContext";
import { Spin } from "antd";

export default function HomeGoods() {
  const [query, setQuery] = useState("");
  const [isThrowOpen, setIsThrowOpen] = useState(false);

  const { goods, isLoading } = useGoods();

  const filteredGoods = goods.filter((good) =>
    good.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleCompleteQuery(e) {
    setQuery(e.target.textContent);
    setIsThrowOpen(!isThrowOpen);
  }

  function handleFocus() {
    setIsThrowOpen(true);
  }

  function handleBlur(e) {
    if (e.target.id !== "homegoods" && e.target.id !== "throw") {
      setIsThrowOpen(false);
    }
  }

  window.addEventListener('click', (e) => {
    if (e.target.className !== "throw__listitem" && e.target.id !== "homegoods" && e.target.id !== "throw") {
      setIsThrowOpen(false);
    }
  })

  return (
    <section className="homegoods">
      <h1 className="homegoods__title">Товары</h1>
      <form className="homegoods__searchform">
        <input
          id="homegoods"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="homegoods__search"
          placeholder="Найдите то, что вам нужно"
          style={{ marginBottom: isLoading ? "200px" : "0px" }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isThrowOpen ? (
          <div className="throw" id="throw">
            {filteredGoods.map((good) => {
              return (
                <span
                  key={good.id}
                  name="item"
                  className="throw__listitem"
                  onClick={handleCompleteQuery}
                >
                  {good.name}
                </span>
              );
            })}
          </div>
        ) : null}
      </form>
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <ul className="homegoods__goodlist">
          {filteredGoods.map((good) => {
            return <GoodCard key={good.id} good={good} />;
          })}
        </ul>
      )}
    </section>
  );
}
