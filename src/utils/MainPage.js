import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import FavUnFilled from "../Images/icon_favourite.png";
import FavFilled from "../Images/icon_favourite_Active.svg";
import heat from "../Images/icon_temperature_info.svg";
import pre from "../Images/icon_precipitation_info.svg";
import humid from "../Images/icon_humidity_info.png";
import wind from "../Images/icon_wind_info.svg";
import visibility from "../Images/icon_visibility_info.svg";
//import { ScaleLoader } from "react-spinners";
import { useWeather } from "../Navbar/Navigation";
import useApi from "./useApi";

const MainPage = () => {
  const { setUnit } = useWeather();
  const {
    city,
    setCity,
    weatherData,
    getData,
    icon,
    localList,
    setLocalList,
    handleChange,
  } = useApi();
  const [like, setLike] = useState([]);
  const [liked, setLiked] = useState();
  //  const [localList, setLocalList] = useState(
  //   localStorage.getItem("Favourites")?.split(",")
  // );
  const handleIconClick = () => {
    if (liked === Favorite) {
      setLike([...like, weatherData.name]);
      setLiked(FavFilled);
    } else {
      setLocalList(localList.filter((e) => e !== weatherData.name));
      setLike(like.filter((e) => e !== weatherData.name));
      setLiked(FavUnFilled);
    }
  };
  if (localList && localList[0] !== "") {
    const data = new Set([...new Set(localList), ...new Set(like)]);
    localStorage.setItem("Favourites", Array.from(data));
  } else {
    localStorage.setItem("Favourites", like);
  }
  const handleUnitChange = (e) => {
    document.getElementById(e.target.id).className = "select";
    e.target.nextSibling === null
      ? (e.target.previousSibling.className = "unselect")
      : (e.target.nextSibling.className = "unselect");
    e.target.id === "fahrenheit" ? setUnit("imperial") : setUnit("metric");
  };

  // const handleChange = (value) => {
  //  setCity(value);
  //  handleIconClick();
  //};
  useEffect(() => {
    console.log("here it is");
    getData();
    handleChange();
  }, [city, weatherData]);
  return (
    <Container>
      <Navbar liked={liked} />
      <Main>
        {weatherData !== null ? (
          <>
            <Side>
              <Text>
                {weatherData.name},{weatherData?.sys?.country}
              </Text>
              <Fav
                src={
                  localStorage
                    .getItem("Favourites")
                    ?.split(",")
                    .includes(weatherData.name) ||
                  like.includes(weatherData.name)
                    ? FavFilled
                    : FavUnFilled
                }
                onClick={handleIconClick}
              />

              <Favorite>Add to favourite</Favorite>
              {/*  <>
                  {liked ? (
                    <>
                      <Fav>
                        <AiFillHeart
                          style={{ color: "#fad05b", fontSize: 21 }}
                          onClick={handleIconClick}
                        />
                      </Fav>
                      <Favorite
                        style={{ color: "#fad05b" }}
                        onClick={handleIconClick}
                      >
                        Add to favourite
                      </Favorite>
                    </>
                  ) : (
                    <>
                      <Fav>
                        <AiOutlineHeart
                          style={{ color: "#ffffff", fontSize: 21 }}
                          onClick={handleIconClick}
                        />
                      </Fav>
                      <Favorite onClick={handleIconClick}>
                        Add to favourite
                      </Favorite>
                    </>
                  )}
                  </>*/}
            </Side>
            <Center>
              <Sunny src={icon} />
              {/*{`http://openweathermap.org/img/w/${weatherdata?.weather[0]?.icon}.png`}*/}
              <Temp>
                <Degree>{Math.floor(weatherData?.main?.temp)}</Degree>
                <Box>
                  <span
                    className="select"
                    id="celsius"
                    onClick={handleUnitChange}
                  >
                    ⁰C
                  </span>
                  <span
                    className="unselect"
                    id="fahrenheit"
                    onClick={handleUnitChange}
                  >
                    ⁰F
                  </span>
                  {/*    <Icon>
                      <Cel
                        className="select"
                        id="celsius"
                        onClick={handleUnitChange}
                      >
                        <sup>o</sup>C
                      </Cel>
                      <Far
                        className="select"
                        id="celsius"
                        onClick={handleUnitChange}
                      >
                        <sup>o</sup>F
                      </Far>
                </Icon>*/}
                </Box>
              </Temp>
              <Wheather>{weatherData?.weather[0]?.main}</Wheather>
            </Center>
            <Footer>
              <Line />
              <Heat>
                <H src={heat} />
                <H1>
                  Min-Max {Math.floor(weatherData?.main?.temp_max)}-
                  {Math.floor(weatherData?.main?.temp_min)}{" "}
                </H1>
              </Heat>
              <Heat>
                <H src={pre} />
                <H1>
                  Precipitation
                  {Math.floor(weatherData?.main?.feels_like)}%
                </H1>
              </Heat>
              <Heat>
                <H src={humid} />
                <H1> Humidity {Math.floor(weatherData?.main?.humidity)}%</H1>
              </Heat>
              <Heat>
                <H src={wind} />
                <H1>Wind {Math.floor(weatherData?.wind?.speed)}mph</H1>
              </Heat>
              <Heat>
                <H src={visibility} />
                <H1>
                  Visibility {Math.floor(weatherData?.visibility / 1000)}
                  mph
                </H1>
              </Heat>
            </Footer>
          </>
        ) : null}
      </Main>
    </Container>
  );
};
export default MainPage;

const Container = styled.div`
  text-align: center;
  margin: 0 12rem;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 1200px) {
    text-align: center;
    margin: 0 12rem;
    height: 100vh;
    display: flex;
    position: relative;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
    margin: 0 12rem;
    height: 100vh;
    display: flex;
  }
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  position: relative;
  height: 70%;
  background-color: red;
`;
const Side = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  position: relative;
  height: 60px;
  width: 140px;
  padding: 0 5px;
  left: -350px;
`;
const Text = styled.a`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2.4rem;
  padding: 0 3px;
  text-align: center;
  position: absolute;
`;
const Fav = styled.img`
  height: 23px;
  width: 20px;
  position: absolute;
  top: 31px;
`;
const Favorite = styled.a`
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 0.9rem;
  position: absolute;
  top: 33px;
  left: 27px;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  position: absolute;
  height: 220px;
  width: 160px;
  top: 30px;
  left: 346px;
`;
const Sunny = styled.img`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Temp = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  height: 94px;
  width: 100%;
  top: 41%;
`;
const Degree = styled.a`
  display: flex;
  position: absolute;
  left: 0px;
  height: fit;
  width: 50%;
  color: #ffffff;
  font-family: Roboto;
  font-size: 4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 6rem;
`;
const Box = styled.div`
  .select {
    height: 19px;
    width: 11px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    border-radius: 2px 0 0 2px;
  }
  .unselect {
    height: 19px;
    width: 9px;
    color: #e32843;
    font-family: Roboto;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    border-radius: 2px;
    background-color: #ffffff;
  }
  display: flex;
  position: absolute;
  width: 50%;
  left: 50%;
  top: 36%;
`;
/*const Icon = styled.div`

  position: relative;
  height: 31px;
  width: 55px;
  display: flex;
  align-items: center;
`;
const Cel = styled.p`
  position: absolute;
  box-sizing: border-box;
  height: 30px;
  width: 28px;
  border: 1px solid #ffffff;
  border-radius: 2px 0 0 2px;
  color: #ffffff;
  padding: 4px;
`;

const Far = styled.p`
  position: absolute;
  left: 50%;
  box-sizing: border-box;
  height: 30px;
  width: 28px;
  border: 1px solid #ffffff;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e32843;
  padding: 4px;
`;*/

const Wheather = styled.a`
  position: absolute;
  height: fit;
  width: 100%;
  color: #ffffff;
  font-family: Roboto;
  font-size: 1.3rem;
  letter-spacing: 0;
  line-height: 2.2rem;
  text-align: center;
  display: inline-block;
  top: 84%;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  height: 30%;
  width: 100%;
  justify-content: space-around;
  display: flex;
  top: 66%;
  align-items: center;
  position: absolute;
  padding: 0 80px;
  @media screen and (max-width: 768px) {
    ::-webkit-scrollbar {
      width: 30px;
    }
  }
`;
const Line = styled.hr`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 1px solid #ffffff;
  opacity: 0.3;
  background-color: white;
  position: absolute;
  top: 0%;
`;
const Heat = styled.div`
  position: relative;
  height: 46px;
  width: 180px;
  margin: 0 12px;
`;

const H = styled.img`
  display: flex;
  position: absolute;
  height: fit;
  width: fit;
  z-index: 1;
`;
const H1 = styled.a`
  display: flex;
  position: absolute;
  margin-left: 25px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 0.9rem;
  letter-spacing: 0;
  line-height: 1.1rem;
`;
