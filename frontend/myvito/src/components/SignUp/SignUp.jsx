// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { mainApi } from "../../api/userApi";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
// setCurrentUser,
export default function SignUp({ setIsLogged }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // console.log(errors)

  const onSubmit = async (data) => {
    await mainApi.signup(data);
    // setCurrentUser({
    //   nick: data.nick,
    //   email: data.email, 
    //   password: data.password
    // })
    navigate("/signin");
    setIsLogged(true);
    reset();
    // console.log(currentUser)
    // console.log(data);
  };

  return (
    <>
      <Header />
      <section className="signup">
        <h2 className="signup__title">Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="signup__form">
          <div className="form__item-wrapper">
            <label htmlFor="nick" className="signup__label">
              Имя пользователя
            </label>
            <input
              {...register("nick", {
                required: "Поле Имя нужно заполнить",
              })}
              placeholder="Имя"
              name="nick"
              className="signup__input"
              type="text"
            />
            {errors.nick && (
              <div className="form__error">{errors.nick.message}</div>
            )}
          </div>
          <div className="form__item-wrapper">
            <label htmlFor="email" className="signup__label">
              Почта
            </label>
            <input
              {...register("email", {
                required: "Поле Email нужно заполнить ",
                pattern: {
                  value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                  message: "Пожалуйста введите корректный адрес почты",
                },
              })}
              placeholder="Почта"
              name="email"
              type="text"
              className="signup__input"
            />
            {errors.email && (
              <div className="form__error">{errors.email.message}</div>
            )}
          </div>

          <div className="form__item-wrapper">
            <label htmlFor="password" className="signup__label">
              Пароль
            </label>
            <input
              {...register("password", {
                required: "Введите пароль",
                minLength: {
                  value: 5,
                  message: "пароль не должен быть короче 5 символов",
                },
              })}
              placeholder="Пароль"
              name="password"
              type="password"
              className="signup__input"
            />
            {errors.password && (
              <div className="form__error">{errors.password.message}</div>
            )}
          </div>

          <button
            disabled={Object.keys(errors).length > 0 ? true : false}
            className="signup__button"
          >
            Зарегистрироваться
          </button>
          <span>
            Уже зарегистрированы? <Link to="/signin">Войти</Link>
          </span>
        </form>
      </section>
    </>
  );
}
