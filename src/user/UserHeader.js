import React, { useEffect, useState } from "react";
import "../source/userheader.css";
import { CSSTransition } from "react-transition-group";
import Logo1 from "../source/logo.svg";
import { NavLink } from "react-router-dom";

const UserHeader = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      <div className="Logo">
        <NavLink to="/user/landingpage">
          <img src={Logo1} />
        </NavLink>
      </div>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <NavLink
            to="/user/landingpage"
            className="item"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#006d7c",
                    fontWeight: "600",
                    textDecoration: "none",
                  }
                : { color: "#b7b7b7", textDecoration: "none" }
            }
          >
            <div className="ho">Beranda</div>
          </NavLink>
          <NavLink
            to="/user/agreement"
            className="item"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#006d7c",
                    fontWeight: "600",
                    textDecoration: "none",
                  }
                : { color: "#b7b7b7", textDecoration: "none" }
            }
          >
            <div className="ho">Daftar Vaksin</div>
          </NavLink>
          <NavLink
            to="/user/vaccine-list"
            className="item"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#006d7c",
                    fontWeight: "600",
                    textDecoration: "none",
                  }
                : { color: "#b7b7b7", textDecoration: "none" }
            }
          >
            <div className="ho">Jadwal</div>
          </NavLink>
          <NavLink
            to="/user/profile"
            className="item"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#006d7c",
                    fontWeight: "600",
                    textDecoration: "none",
                  }
                : { color: "#b7b7b7", textDecoration: "none" }
            }
          >
            <div className="ho">Profil</div>
          </NavLink>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        Menu
      </button>
    </header>
  );
};

export default UserHeader;
