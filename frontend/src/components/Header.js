import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";

function Header({ loggedIn,userData, signOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {loggedIn &&
        <div className="header__content">
          <p className="header__email">{userData}</p>
          <Link to="/sign-in" className="header__link" onClick={signOut}>
            Выйти
          </Link>
        </div>
      }
    </header>
  );
}

export default Header;
