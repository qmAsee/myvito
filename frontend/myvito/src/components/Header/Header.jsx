import { useEffect, useState } from "react";
import like from "../../images/like.svg";
import NewAdPopup from "../NewAdPopup/NewAdPopup";
import { Link } from "react-router-dom";
import { useUser } from "../../context/CurrentUserContext";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function Header() {
  const {isLogged} = useUser()
  const [modal, setModal] = useState(false);

  function handleModal() {
    setModal((prev) => !prev);
  }
  // useEffect(() => {
  //   window.addEventListener('click', () => console.log(isLogged))
  // }, [])
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        MyVito
      </Link>
      <nav className="header__nav">
        <button
          onClick={handleModal}
          type="button"
          className="header__button header__button_l"
        >
          Новое объявление
        </button>
        <button type="button" className="header__button header__button_s">
          <img src={like} alt="like" />
        </button>
        <button type="button" className="header__button header__button_s">
          Корзина
        </button>
        {/* <Link to="/signup" type="button" className="header__button header__button_s">
          Регистрация
        </Link>
        <Link to="/signin" type="button" className="header__button header__button_s">
          Войти
        </Link> */}
        {isLogged ? (
          <Link
            to="/profile"
            type="button"
            className="header__button header__button_s"
          >
            Профиль
          </Link>
        ) : (
          <>
            <Link
              to="/signup"
              type="button"
              className="header__button header__button_s"
            >
              Регистрация
            </Link>
            <Link
              to="/signin"
              type="button"
              className="header__button header__button_s"
            >
              Войти
            </Link>
          </>
        )}
      </nav>
      <NewAdPopup open={modal} setOpen={handleModal} />
    </header>
  );
}
