// import { useState } from 'react'
import "./App.css";
import { useEffect } from "react";
import { GoodsContextProvider } from "./context/GoodsContext";
import { CurrentUserProvider, useUser } from "./context/CurrentUserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./layouts/MainPage";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
// import { useUser } from "./context/CurrentUserContext";
import ProtectedRouteElement from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./components/Profile/Profile";

function App() {
  const { isLogged, setIsLogged } = useUser();
  function cons() {
    console.log(isLogged);
    // console.log(nick, email);
    // console.log(currentUser.nick, currentUser.email);
    // getCurrentUser()
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }
  useEffect(() => {
  window.addEventListener("click", cons);
  return () => window.removeEventListener(
      'click',
      cons
  );
  })

  // useEffect(() => {
  //   if (isLogged) {
  //     getCurrentUser()
  //       .then((res) => {
  //         console.log(res);
  //         console.log(currentUser);
  //         setCurrentUser({
  //           nick: res.nick,
  //           email: res.email,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [isLogged]);

  return (
    <CurrentUserProvider>
      <GoodsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage isLogged={isLogged} />} />
            <Route
              path="/signup"
              element={<SignUp setIsLogged={setIsLogged} />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  // setIsLogged={setIsLogged}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </GoodsContextProvider>
    </CurrentUserProvider>
  );
}

export default App;
