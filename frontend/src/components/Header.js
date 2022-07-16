import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import closeButton from "../images/header-menu-close.svg";
import burgerMenu from "../images/burger-menu.svg";

function Header({ loggedIn, ...props }) {
  const location = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  function handleClick() {
    loggedIn
      ? props.handleSignOut()
      : location.pathname === "/sign-up"
      ? props.navigateToLogin()
      : props.navigateToRegister();
  }

  function handleBurgerMenuClick() {
    isMenuOpened ? setIsMenuOpened(false) : setIsMenuOpened(true);
  }

  return (
    <header className="header page__header">
      <div className="header__group">
        <div className="header__logo"></div>
        <button
          className="header__burger-menu"
          onClick={handleBurgerMenuClick}
          style={{
            backgroundImage: isMenuOpened
              ? `url(${closeButton})`
              : `url(${burgerMenu})`,
          }}
        ></button>
      </div>
      <div
        className="header__group"
        style={{
          display: isMenuOpened || width > 600 ? "flex" : "none",
        }}
      >
        <p className="header__user">
          {loggedIn && props.userData && props.userData.email}
        </p>
        <button className="header__link" onClick={handleClick}>
          {loggedIn
            ? "Выйти"
            : location.pathname === "/sign-up"
            ? "Войти"
            : "Регистрация"}
        </button>
      </div>
    </header>
  );
}

export default Header;
