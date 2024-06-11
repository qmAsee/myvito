import { createContext, useContext, useEffect, useState } from "react";
import { mainApi } from "../api/userApi";
const CurrentUserContext = createContext({
  nick: "",
  email: "",
});

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export const CurrentUserProvider = ({ children }) => {
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setIsLogged(true);
    }
  }, []);

  async function dataFetch() {
    return await mainApi.getCurrentUser()
  }

  useEffect(() => {
    window.addEventListener('click', dataFetch)
    return () => window.removeEventListener('click', dataFetch)
  })
  // function setData(data) {
  //   setNick(data.nick)
  //   setEmail(data.email)
  //   setIsLogged(true)
  // }
  // window.addEventListener('click', () => {
  //   if (isLogged) {
  //     getCurrentUser()
  //       .then((res) => {
  //         console.log(res);
  //         setNick({
  //           nick: res.nick,
  //         });
  //         setEmail({
  //           email: res.email,
  //         })
  //         setIsLogged(true);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // })

  useEffect(() => {
    if (isLogged) {
      fetch(`http://localhost:3003/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json()) 
        .then((data) => {
          console.log(data)
          setNick(data.nick);
          setEmail(data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogged]);

  return (
    <CurrentUserContext.Provider
      value={{ nick, email, isLogged, setIsLogged, setNick, setEmail }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export function useUser() {
  return useContext(CurrentUserContext);
}

export default CurrentUserContext;
