import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useUser } from "../../context/CurrentUserContext";
import { mainApi } from "../../api/userApi";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function SignIn() {
  const navigate = useNavigate();
  const { setNick, setEmail, setIsLogged } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  async function onSubmit(data) {
    await mainApi
      .signin(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        setNick(res.nick);
        setEmail(res.email);
        setIsLogged(true);
        navigate("/profile");
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header />
      <section className="signin">
        <h2 className="signin__title">Войти</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="signin__form">
          <label htmlFor="nick" className="signin__label">
            Имя пользователя
          </label>
          <input
            {...register("nick", {
              required: "Поле Имя нужно заполнить",
            })}
            placeholder="Имя"
            name="nick"
            className="signin__input"
            type="text"
          />
          {errors.nick && (
            <div style={{ color: "red" }}>{errors.nick.message}</div>
          )}

          <label htmlFor="password" className="signin__label">
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
            className="signin__input"
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password.message}</div>
          )}
          <button
            disabled={Object.keys(errors).length > 0 ? true : false}
            className="signin__button"
          >
            Войти
          </button>
          <span>
            Еще не зарегистрированы? <Link to="/signup">Регистрация</Link>
          </span>
        </form>
      </section>
    </>
  );
}
