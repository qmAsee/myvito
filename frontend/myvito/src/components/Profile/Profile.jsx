import './Profile.css'
import Header from "../Header/Header";
// import CurrentUserContext from "../../context/CurrentUserContext";
// import { useContext } from "react";
import { useUser } from '../../context/CurrentUserContext';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function Profile() {
    const {nick, email, isLogged, setIsLogged} = useUser()

    function onLogout() {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            localStorage.removeItem('jwt');
            setIsLogged(false);
        }
    }

  return (
    <>
      <Header isLogged={isLogged}/>
      <div className="profile">
        <h2>Привет, {nick}</h2>
        <span className='profile__email'>Ваша почта: {email}</span>
        <button className='profile__button' onClick={onLogout}>выйти</button>
      </div>
    </>
  );
}
