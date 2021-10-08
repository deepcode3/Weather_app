import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../Images/logo_web.svg";
import Search from "../../Images/icon_search_white.png";
import HamMenu from "../../Images/icon_menu_white.png";
import BackIcon from "../../Images/icon_back_black.png";
import SearchDark from "../../Images/icon_search_white.png";
import moment from "moment";
import { useLocation } from "react-router";

function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? window.innerWidth : undefined
  );

  useEffect(() => {
    function setSize() {
      setWindowSize(window.screen.width);
    }

    if (isWindowClient) {
      window.addEventListener("resize", setSize);
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowSize]);

  return windowSize;
}

const Header = ({ handleChange }) => {
  let location = useLocation();
  const history = useHistory();
  const width = useWindowSize();
  const [mblSearch, setMblSearch] = useState(false);
  console.log(location.pathname);

  const handleSearch = () => {
    const search = document.getElementsByClassName("search-bar");
    handleChange(search[0].value);
  };

  const handleMblSearch = () => {
    const search = document.getElementsByClassName("mbl-search-bar");
    handleChange(search[0].value);
    setMblSearch(false);
  };

  const showNavbar = () => {
    if (width < 750) {
      document.getElementById("navbar").className =
        document.getElementById("navbar").className === "invisible"
          ? "navbar"
          : "invisible";
    }
  };

  useEffect(() => {
    let htmlNodes = document.getElementById(location.pathname);
    if (htmlNodes) {
      htmlNodes.checked = true;
    }
  }, []);

  return (
    <Div>
      {mblSearch ? (
        <div className="mbl-search-container">
          <div className="mbl-search-top">
            <img
              src={BackIcon}
              className="back-icon"
              onClick={() => setMblSearch(false)}
            />
            <input
              type="search"
              className="mbl-search-bar"
              place
              placeholder="Search city"
            />
            <img
              src={SearchDark}
              className="mbl-search-icon"
              onClick={handleMblSearch}
            />
          </div>
        </div>
      ) : (
        <>
          {width < 750 && location.pathname !== "/" ? (
            <div className="mbl-header">
              <div className="mbl-search-top">
                <img
                  src={BackIcon}
                  className="back-icon"
                  onClick={() => history.push("/")}
                />
                <span className="mbl-heading">
                  {location.pathname === "/favourite"
                    ? "Favourite"
                    : "Recent search"}
                </span>
                <img
                  src={SearchDark}
                  className="mbl-search-icon"
                  onClick={() => setMblSearch(true)}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="header">
                {width > 750 ? (
                  <></>
                ) : (
                  <img src={HamMenu} className="ham" onClick={showNavbar} />
                )}
                <img src={Logo} className="Logo" />
                {width > 750 ? (
                  <div className="search-container">
                    <input
                      type="search"
                      className="search-bar"
                      placeholder="Search city"
                    />
                    <img
                      className="search-icon"
                      src={Search}
                      alt="search"
                      onClick={handleSearch}
                    ></img>
                  </div>
                ) : (
                  <img
                    className="search-icon"
                    src={Search}
                    alt="search"
                    onClick={() => setMblSearch(true)}
                  ></img>
                )}
              </div>
              <div className="topnavbar">
                <ul
                  className={width > 750 ? "navbar" : "invisible"}
                  id="navbar"
                >
                  <Link to="/">
                    <input
                      type="radio"
                      id="/"
                      name="navlist"
                      className="radio"
                    />
                    <label
                      className="navlist"
                      htmlFor="home"
                      onClick={showNavbar}
                    >
                      HOME
                    </label>
                  </Link>
                  <Link to="favourite">
                    <input
                      type="radio"
                      id="/favourite"
                      name="navlist"
                      className="radio"
                    />
                    <label
                      className="navlist"
                      htmlFor="favourite"
                      onClick={showNavbar}
                    >
                      FAVOURITE
                    </label>
                  </Link>
                  <Link to="recent-search">
                    <input
                      type="radio"
                      id="/recent-search"
                      name="navlist"
                      className="radio"
                    />
                    <label
                      className="navlist"
                      htmlFor="recent-search"
                      onClick={showNavbar}
                    >
                      RECENT SEARCH
                    </label>
                  </Link>
                </ul>
                <div className="date-time">
                  {moment().format("ddd, DD MMM YYYY LT")}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Div>
  );
};

const Div = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    padding-top: 4.3rem;
    left: 0;
    right: 0;
  }
  .ham {
    height: 2.4rem;
    width: 2.4rem;
    margin-top: auto;
    margin-bottom: auto;
  }
  .Logo {
    margin-left: 0;
    height: 3rem;
  }
  .search-container {
    box-sizing: border-box;
    height: 4.5rem;
    width: 45.8rem;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 0.3rem;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
  }
  .mbl-search-container {
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding-bottom: 7rem;
  }
  .mbl-header {
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 5.6rem;
    position: absolute;
    width: 100%;
    height: 10%;
    background: #ffffff;
  }
  .back-icon {
    padding: 1.6rem;
    vertical-align: middle;
  }
  .mbl-search-top {
    display: flex;
    height: 5.6rem;
    box-sizing: border-box;
    justify-content: space-between;
    width: 100%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }
  .mbl-search-bar {
    box-sizing: border-box;
    border: none;
    background: transparent;
    height: 5.6rem;
    width: 70%;
    opacity: 0.3;
    font-family: Roboto;
    font-size: 2.1rem;
    letter-spacing: 0;
    line-height: 3.6rem;
    margin-left: 3.2rem;
    ::placeholder {
      color: rgba(0, 0, 0, 1);
    }
    :focus {
      outline: none;
    }
  }
  .mbl-heading {
    width: 70%;
    margin-top: auto;
    margin-bottom: auto;
    height: 24px;
    color: rgba(41, 47, 51, 1);
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 24px;
    text-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
  }
  .mbl-search-icon {
    height: 1.75rem;
    width: 1.75rem;
    margin-top: auto;
    margin-bottom: auto;
    padding-right: 5%;
  }
  .search-bar {
    box-sizing: border-box;
    height: 4.5rem;
    width: 39.9rem;
    border: none;
    background: transparent;
    padding-left: 1.4rem;
    font-size: 1.6rem;
    letter-spacing: 0;
    line-height: 1.9rem;
    ::placeholder {
      color: rgba(255, 255, 255, 1);
    }
    :focus {
      outline: none;
    }
    :select {
      color: #000000;
    }
  }
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
  .search-icon {
    vertical-align: middle;
    height: 1.75rem;
    width: 1.75rem;
    padding: 1rem;
    pointer-events: cursor;
  }
  .navbar {
    list-style-type: none;
    width: 80%;
    display: flex;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  .navlist {
    height: 1.6rem;
    color: #ffffff;
    font-family: Roboto;
    font-size: 1.3rem;
    letter-spacing: 0;
    line-height: 1.6rem;
    margin-right: 4.6rem;
    margin-top: auto;
    margin-bottom: auto;
  }
  .date-time {
    height: 1.6rem;
    color: #ffffff;
    font-family: "Roboto";
    font-size: 1.4rem;
    letter-spacing: 0;
    line-height: 1.6rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    white-space: nowrap;
  }
  .topnavbar {
    display: flex;
    justify-content: space-between;
    margin-top: 4.4rem;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  a {
    text-decoration: none;
  }
  .radio {
    display: none;
    :checked + label {
      height: 1.5rem;
      color: #ffd639;
      font-family: Roboto;
      font-size: 1.3rem;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 1.5rem;
      padding-bottom: 0.6rem;
      border-bottom: 2px solid #ffd639;
    }
  }
  .invisible {
    display: none;
  }
  @media all and (max-width: 750px) {
    .navbar {
      left: 0;
      padding-left: 10%;
      padding-top: 10%;
      display: flex;
      flex-direction: column;
      gap: 10%;
      position: absolute;
      width: 70%;
      height: 100%;
      top: 0;
      background: #ffffff;
    }
    .navlist {
      height: 1.6rem;
      color: rgba(112, 112, 112, 1);
      font-family: Roboto;
      font-size: 1.6rem;
      letter-spacing: 0;
      line-height: 1.6rem;
      margin-right: 4.6rem;
      margin-top: auto;
      margin-bottom: auto;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .radio {
      display: none;
      :checked + label {
        height: 1.5rem;
        color: rgba(0, 0, 0, 1);
        font-family: Roboto;
        font-size: 1.6rem;
        font-weight: 500;
        letter-spacing: 0;
        line-height: 1.5rem;
        padding-bottom: 0.6rem;
        border: none;
      }
    }
    .date-time {
      margin-left: auto;
      margin-right: auto;
    }
    .Logo {
      padding-right: 40%;
    }
  }
`;

export default Header;
