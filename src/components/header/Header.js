import React from "react";
import { Link } from "react-router-dom";
import ENFlag from "img/en-flag.png";
import NLFlag from "img/nl-flag.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "userSlice";
import { auth } from "../../firebase";
import styled from "styled-components";

const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;

  @media (max-width: 720px) {
    justify-content: flex-end;
  }
`;

const HeaderLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-transform: lowercase;
  text-decoration: none;

  @media (max-width: 720px) {
    display: none;
  }
`;

const FaFilmIcon = styled.i`
  color: #0073d1;
`;

const HeaderDescription = styled.p`
  font-family: "Poppins", sans-serif;
  border-radius: 0.1vw;
  font-size: 20px;
  letter-spacing: 1px;
  padding: 15px 25px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  outline: none;
  font-weight: bold;

  span {
    font-weight: lighter;
  }
`;

const HeaderItems = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 720px) {
    margin-top: 15px;
  }
`;

const HeaderPicture = styled.img`
  cursor: pointer;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  margin-right: 10px;
`;

const FaToggleOnIcon = styled.i`
  margin: 0 40px;
  color: #0073cf;

  @media (max-width: 720px) {
    margin-right: 0;
  }
`;

const HeaderButton = styled.button`
  font-family: "Poppins", sans-serif;
  border-radius: 0.1vw;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 15px 25px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  outline: none;
  margin-left: 10px;

  @media (max-width: 720px) {
    position: absolute;
    left: 10px;
    top: 15px;
  }
`;

const HeaderSub = styled.nav`
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  overflow-y: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 720px) {
    margin-top: 10px;
  }
`;

const HeaderNav = styled.ul`
  display: flex;
  list-style: none;
`;

const HeaderLink = styled.li`
  a {
    padding: 15px;
    margin: 15px;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: 0.1s;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      background-color: #242424;
      color: #fff;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

    &:focus {
      font-weight: 600;
    }
  }
`;

const HeaderUser = styled.p`
  display: flex;
  align-items: center;

  @media (max-width: 1500px) {
    margin-left: 80px;
  }
`;

const FaUserCircleIcon = styled.i`
  font-size: 25px;
  margin-right: 8px;
`;

function Header({ i18n, changeTheme }) {
  const { t } = useTranslation();

  const changeLanguage = (ln) => {
    return () => {
      i18n.changeLanguage(ln);
      localStorage.setItem("language", ln);
    };
  };

  const user = useSelector(selectUser);

  return (
    <header>
      <HeaderMain>
        <HeaderLogo to="/">
          <FaFilmIcon className="fas fa-film fa-3x" />
          <HeaderDescription>
            Film<span>Cave</span>
          </HeaderDescription>
        </HeaderLogo>
        <HeaderItems>
          <div>
            <Link to="#" onClick={changeLanguage("en")}>
              <HeaderPicture
                width="27"
                height="25"
                src={ENFlag}
                alt="English flag"
              />
            </Link>
            <Link to="#" onClick={changeLanguage("nl")}>
              <HeaderPicture
                width="27"
                height="25"
                src={NLFlag}
                alt="Dutch flag"
              />
            </Link>

            <Link to="#" onClick={() => changeTheme()}>
              <FaToggleOnIcon className="fas fa-toggle-on fa-2x" />
            </Link>
          </div>
          <HeaderButton to="/" onClick={() => auth.signOut()}>
            {t("button--one")}
          </HeaderButton>
        </HeaderItems>
      </HeaderMain>

      <HeaderSub>
        <HeaderNav>
          <HeaderLink>
            <Link to="/">{t("nav__link--one")}</Link>
          </HeaderLink>
          <HeaderLink>
            <Link to="/current-tv-series">{t("nav__link--two")}</Link>
          </HeaderLink>
          <HeaderLink>
            <Link to="/new-movies-and-tv-series-episodes">
              {t("nav__link--three")}
            </Link>
          </HeaderLink>
          <HeaderLink>
            <Link to="/search-a-movie">{t("nav__link--four")}</Link>
          </HeaderLink>
          <HeaderLink>
            <Link to="/search-a-tv-serie">{t("nav__link--five")}</Link>
          </HeaderLink>

          <HeaderLink>
            <Link to="/your-watchlist">{t("nav__link--six")}</Link>
          </HeaderLink>
        </HeaderNav>
        <HeaderUser>
          <FaUserCircleIcon className="fas fa-user-circle" />
          <span>{user.email}</span>
        </HeaderUser>
      </HeaderSub>
    </header>
  );
}

export default Header;
