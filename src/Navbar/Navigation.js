import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import LogoSrc from "../Images/logo_web.svg";
import useApi from "../utils/useApi";
//import Search from "../Images/icon_search_white.png";
//import BackIcon from "../Images/icon_back_black.png";
//import SearchDark from "../Images/icon_search_white.png"; //icon_back_black.png
//import { useLocation } from "react-router";

import Thunderstorm from "../Images/icon_thunderstorm_small.svg";
import Rain from "../Images/icon_rain_small.svg";
import Clear from "../Images/icon_clear_night_small.svg";
import PartlyCloudy from "../Images/icon_partly_cloudy_small.svg";
import Sun from "../Images/icon_mostly_sunny_small.svg";
import MostlyCloudy from "../Images/icon_mostly_cloudy_small.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";

import { Container } from "../globalStyles";
import getWeatherData from "../Services/api";
import { useBetween } from "use-between";
export const useWeather = () => useBetween(useShareable);

const useShareable = () => {
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherData] = useState(null);
  const [icon, setIcon] = useState();
  const [recentTable, setRecentTable] = useState([]);
  //const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [localList, setLocalList] = useState(
    localStorage.getItem("Favourites")?.split(",")
  );
  const [rec, setRec] = useState([]);
  const recentList = localStorage.getItem("Recent")?.split(",");
  return {
    weatherdata,
    setWeatherData,
    recentTable,
    setRecentTable,
    icon,
    setIcon,
    unit,
    setUnit,
    localList,
    setLocalList,
    city,
    setCity,
    rec,
    setRec,
  };
};

const Navbar = (param) => {
  //const {
  //  setIcon,
  // setWeatherData,
  //recentTable,
  //setRecentTable,
  //unit,
  //city,
  // setCity,
  // rec,
  //setRec,
  // } = useBetween(useShareable);
  const { city, setCity, getData, icon, setIcon, rec, setRec, handleChange } =
    useApi();

  const [showicon, setShowicon] = useState(false);
  /* const getData = async () => {
    try {
      // param.setLoading(true);
      const data = await getWeatherData(city);
      setWeatherData(data);
      console.log("Main data", data);

      data === undefined ? setWeatherData("error") : setWeatherData(data);
      if (city !== "") setRec([...rec, data.name]);
      // let loc = data.name;
      const id = data.weather[0].id;
      if (id >= 200 && id <= 232) {
        setIcon(Thunderstorm);
      } else if (id >= 300 && id <= 531) {
        setIcon(Rain);
      } else if (id === 800) {
        setIcon(Clear);
      } else if (id === 801 || id === 802) {
        setIcon(PartlyCloudy);
      } else if (id === 803 || id === 804) {
        setIcon(MostlyCloudy);
      } else {
        setIcon(Sun);
      }
      //param.setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };*/

  /*    setWeatherData(data);
      localStorage.setItem("data", JSON.stringify(data));
      console.log("Main data", data);
      param.setLoading(false);
      addDataRecent();
    } catch (error) {
      console.log("error is caught", error.message);
    }
  };*/

  useEffect(() => {
    getData();
  }, [city]);

  // const handleChange = (e) => {
  //    setCity(e.target.value);
  //  };

  /********************************************/

  //storing in local storage

  /*if (recentList && recentList[0] !== "") {
    const searchData = new Set([...new Set(rec), ...new Set(recentList)]);
    localStorage.setItem("Recent", Array.from(searchData));
  } else {
    localStorage.setItem("Recent", rec);
  }*/
  /********************************************/
  const handleClick = (e) => {
    // setSearchicon(!searchicon);
    e.preventDefault();
    getData();
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <Logo src={LogoSrc} />
          <TextBox>
            <Input
              type="text"
              onChange={handleChange}
              className="TextBox_input"
              placeholder="Search City"
            />
            <Searchs type="button" type="button" onClick={handleClick}>
              <IoMdSearch size={28} />
            </Searchs>
          </TextBox>
          <Bar type="Button" onClick={() => setShowicon(!showicon)} />
          <NavMenu>
            <NavItem>
              <NavLink to="/" activeStyle>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Favorites" activeStyle>
                Favorite
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Recent_Search" activeStyle>
                Recent Research
              </NavLink>
            </NavItem>
          </NavMenu>

          <Day>{moment().format("dddd,MMMM Do YYYY  h:mm a")}</Day>
          <Line />
        </NavbarContainer>
      </Nav>
    </>
  );
};
export default Navbar;

const Nav = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  text-align: center;
  justify-content: center;
  position: relative;
  font-size: 1.2rem;
  z-index: 999;
  top: 0;
`;
export const NavbarContainer = styled(Container)`
  /**********/
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 30%;
  ${Container}
`;
const Line = styled.hr`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 1px solid #ffffff;
  opacity: 0.3;
  background-color: white;
  position: absolute;
  top: 155px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  height: 30px;
  width: 142px;
  position: absolute;
  top: 10px;
  left: 10px;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: -6rem;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    left: 20rem;
    padding: 1rem;
    cursor: pointer;
    align-items: center;
  }
`;

const Bar = styled(GiHamburgerMenu)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    display: flex;
    left: -9rem;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  position: absolute;
  top: 110px;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ click }) => (click ? 0 : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    background: #101522;
  }
`;
export const NavItem = styled.li`
  height: 16px;
  border-bottom: 1px solid transparent;
  @media screen and (max-width: 768px) {
    width: 100%;
    &:hover {
      color: #ffd639;
      border-bottom: solid #ffd639;
      font-weight: 500;
    }
  }
`;
const NavLink = styled(Link)`
  font-family: Roboto;
  font-size: 1rem;
  line-height: 1.8rem;
  color: #ffffff;
  border-bottom: solid transparent;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  &:hover {
    color: #ffd639;
    border-bottom: solid #ffd639;
  }
  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

const NavMobileMenu = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    position: absolute;
    display: flex;
    align-items: left;
    background-color: white;
    /*z-index: 99;*/
    transition: all 2s linear;
    transform-origin: left;
    width: 130rem;
    left: -100rem;
    height: 50rem;
    top: 4rem;
  }
`;

const NavLinkMobile = styled(Link)`
  font-family: Roboto;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1.6rem;
  color: black;
  border-bottom: solid transparent;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  flex-direction: row;
  top: 5rem;
`;
const Day = styled.a`
  display: flex;
  position: absolute;
  height: 20px;
  width: 270px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 1rem;
  left: 510px;
  top: 125px;
  text-align: center;
  @media screen and (max-width: 768px) {
    top: 7rem;
    display: flex;
    position: absolute;
    left: -50rem;
  }
`;

const TextBox = styled.div`
  display: flex;
  height: 45px;
  width: 458px;
  position: absolute;
  position: relative;
  top: 10px;
  left: 150px;
  @media screen and (max-width: 768px) {
    height: 3rem;
    width: 3rem;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  height: 45px;
  width: 458px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  position: relative;
  background-color: rgb(255, 255, 255, 0.3);
  ::placeholder {
    height: 19px;
    width: 79px;
    opacity: 0.8;
    color: #ffffff;
    font-family: Roboto;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
    padding: 4px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Searchs = styled.div`
  position: relative;
  left: 420px;
  top: 5px;
  outline: none;
  position: absolute;
  background-color: inherit;
  height: 2.2px;
  width: 2.2px;
  cursor: pointer;
  border-collapse: collapse;
  color: white;
  @media screen and (max-width: 768px) {
    position: relative;
    right: 6rem;
    top: -4rem;
    height: 2.4rem;
    width: 2.4rem;
  }
`;
/*const Line = styled.div`
  
  @media screen and (max-width: 768px) {
    box-sizing: border-box;
    height: 0.1rem;
    width: 500rem;
    border: 0.1rem solid #ffffff;
    opacity: 0.3;
    position: relative;
    top: 90%;
    left: -18%;
    background-color: white;
  }
`;*/
/*************/
const SearchField = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    position: absolute;
    display: flex;
    align-items: left;
    background-color: white;
    /*z-index: 99;*/
    transition: all 2s linear;
    transform-origin: left;
    width: 130rem;
    left: -100rem;
    height: 50rem;
    top: 4rem;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    color: #ffd639;
    border-bottom: solid #ffd639;
    font-weight: 50rem;
  }
`;
