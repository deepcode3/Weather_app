import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoSrc from "../Images/logo_web.svg";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBetween } from "use-between";
import getWeatherData from "../Services/api";
import { useCounters } from "../utils/MainPage";
import "./Nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";

export const useSharedCounter = () => useBetween(useShareableState);

const useShareableState = () => {
  const [weatherdata, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("udupi");
  const [recentTable, setRecentTable] = useState([]);
  const { liked } = useCounters();

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getWeatherData(city);
      setWeatherData(data);
      localStorage.setItem("data", JSON.stringify(data));
      console.log("normal data recent", data);
      // localStorage.setItem("favorite", JSON.stringify(data));
      setLoading(false);
      // addDataRecent();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getData2 = async () => {
    try {
      setLoading(true);
      const data2 = await getWeatherData(liked);
      setWeatherData(data2);
      localStorage.setItem("favorite", JSON.stringify(data2));
      console.log("favorite get data", data2);
      setLoading(false);
      // addDataRecent();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const search = localStorage.getItem("data");
  let savedPerson = JSON.parse(search);

  const addDataRecent = () => {
    setRecentTable([
      ...recentTable,
      { id: recentTable.length, value: savedPerson },
    ]);
  };

  return {
    weatherdata,
    setWeatherData,
    loading,
    setLoading,
    city,
    setCity,
    recentTable,
    setRecentTable,
    getData,
    getData2,
    addDataRecent,
  };
};

const NavigationBar = () => {
  //const classes = useStyles();
  const { city, setCity, getData, getData2, addDataRecent } =
    useBetween(useShareableState);
  const [showicon, setShowicon] = useState(false);

  useEffect(() => {
    getData();
    getData2();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    getData();
    addDataRecent();
  };
  return (
    <>
      <nav className="main-nav">
        <div className="main-nav1">
          <div className="main_menu">
            <img src={LogoSrc} alt="logo"></img>
          </div>
          <div className="main_menu2">
            <ul>
              <li>
                <Link to="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to="/Favorites">
                  <a>Favorite</a>
                </Link>
              </li>
              <li>
                <Link to="/Recent_Search">
                  <a>Recent Search</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="ham-menu">
            <a onClick={() => setShowicon(!showicon)}>
              {" "}
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
        <div>
          <div className="TextBox">
            <input
              type="text"
              onChange={handleChange}
              className="TextBox_input"
              placeholder="Search City"
            />
            <div type="button" onClick={handleClick} className="TextBox_Button">
              <IoMdSearch size={28} />
            </div>
          </div>
          <a className="Day">{moment().format("dddd,MMMM Do YYYY  h:mm a")}</a>
        </div>
        <Line />
      </nav>
    </>
  );
};
export default NavigationBar;

const Line = styled.line`
  box-sizing: border-box;
  height: 1px;
  width: 960px;
  border: 1px solid #ffffff;
  opacity: 0.3;
  left: 121px;
  top: 145px;
  position: absolute;
`;
/*
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  height: 165px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
const LogoDiv = styled.div`
  background-image: url(${LogoSrc});
  height: 29px;
  width: 141px;
  margin-left: 121px;
  top: 43px;
  position: absolute;
`;
const TextBox = styled.div`
  position: relative;
  display: flex;
  height: 4.5rem;
  width: 45.8rem;
  position: absolute;
  top: 5rem;
`;

const Text1 = styled.a`
  width: max-content;
  text-align: center;
  text-decoration: none;
  height: 15px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 15px;
  position: absolute;
  top: 126px;
  left: 134px;
  &:hover {
    color: #ffd639;
    text-decoration-line: underline;
    font-weight: 500px;
  }
`;
const Text2 = styled.a`
  width: max-content;
  text-align: center;
  text-decoration: none;
  height: 15px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 15px;
  position: absolute;
  left: 220px;
  top: 126px;
  &:hover {
    color: #ffd639;
    text-decoration-line: underline;
    font-weight: 500px;
  }
`;
const Text3 = styled.a`
  width: max-content;
  text-align: center;
  text-decoration: none;
  height: 15px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 15px;
  position: absolute;
  left: 334px;
  top: 126px;
  &:hover {
    color: #ffd639;
    text-decoration-line: underline;
    font-weight: 500px;
  }
`;
const Day = styled.a`
  height: 16px;
  width: 250px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 16px;
  text-align: right;
  display: inline-block;
  margin-left: 365px;
  position: absolute;
  right: 130px;
  top: 124px;
`;*/

//*************************************************************
{
  /*
import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import LogoSrc from "../Images/logo_web.svg";
import Thunderstorm from "../Images/icon_thunderstorm_small.svg";
import Rain from "../Images/icon_rain_small.svg";
import Clear from "../Images/icon_clear_night_small.svg";
import PartlyCloudy from "../Images/icon_partly_cloudy_small.svg";
import Sun from "../Images/icon_mostly_sunny_small.svg";
import MostlyCloudy from "../Images/icon_mostly_cloudy_small.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";
import moment from "moment";
import { Container } from "../globalStyles";
import getWeatherData from "../Services/api";
import { useBetween } from "use-between";
import { useLocation } from "react-router";
export const useWeather = () => useBetween(useShareable);

const useShareable = () => {
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherData] = useState(null);
  const [icon, setIcon] = useState();
  const [recentTable, setRecentTable] = useState([]);
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

const Navbar = ({ handleChange }, param) => {
  const {
    setIcon,
    setWeatherData,
    recentTable,
    setRecentTable,
    unit,
    city,
    setCity,
    rec,
    setRec,
  } = useBetween(useShareable);

  const [showicon, setShowicon] = useState(false);
  const [searchicon, setSearchicon] = useState(false);
  const [mblSearch, setMblSearch] = useState(false);
  let location = useLocation();
  const history = useHistory();
  var loc;
  const handleSearch = () => {
    const search = document.getElementsByClassName("search-bar");
    handleChange(search[0].value);
  };
  const handleMblSearch = () => {
    const search = document.getElementsByClassName("mbl-search-bar");
    handleChange(search[0].value);
    setMblSearch(false);
  };
  const getData = async () => {
    try {
      param.setLoading(true);
      const data = await getWeatherData(city, unit);
      setWeatherData(data);
      data === undefined ? setWeatherData("error") : setWeatherData(data);
      if (city !== "") setRec([...rec, data.name]);
      loc = data.name;
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
      param.setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  {
    /*    setWeatherData(data);
      localStorage.setItem("data", JSON.stringify(data));
      console.log("Main data", data);
      param.setLoading(false);
      addDataRecent();
    } catch (error) {
      console.log("error is caught", error.message);
    }
  };*/
} /***************************** 
useEffect(() => {
  getData();
}, [city, param.liked]);
{*************************/
/*
const handleChange = (e) => {
  setCity(e.target.value);
};*/

/********************************************/

//storing in local storage

/*if (recentList && recentList[0] !== "") {
  const searchData = new Set([...new Set(rec), ...new Set(recentList)]);
  localStorage.setItem("Recent", Array.from(searchData));
} else {
  localStorage.setItem("Recent", rec);
}*/
/********************************************/
{
  /*
const handleClick = (e) => {
  e.preventDefault();
  setSearchicon(!searchicon);
  getData();
};
const search = localStorage.getItem("data");
let savedPerson = JSON.parse(search);

const addDataRecent = () => {
  setRecentTable([
    ...recentTable,
    { id: recentTable.length, value: savedPerson },
  ]);
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
          <Search type="button" type="button" onClick={handleClick}>
            <IoMdSearch size={28} />
          </Search>
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
/**********
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
  /*z-index: 99;*
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
const Search = styled.div`
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
  /*************
const SearchField = styled.div`
display: none;
@media screen and (max-width: 768px) {
  position: absolute;
  display: flex;
  align-items: left;
  background-color: white;
  /*z-index: 99;*
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
*/
}
