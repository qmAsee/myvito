import Header from "../components/Header/Header";
import HomeGoods from "../components/HomeGoods/HomeGoods";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function HomePage({isLogged}) {
  return (
    <>
      <Header isLogged={isLogged}/>
      <HomeGoods />
    </>
  );
}
