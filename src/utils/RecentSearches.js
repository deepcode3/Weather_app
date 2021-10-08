import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Nothing from "../Images/icon_nothing.svg";
import PopRecent from "./FavouritePopup";
import Navbar from "../Navbar/Navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useWeather } from "../Navbar/Navigation";

const RecentSearches = () => {
  const recentList = useRef([]);
  const [recList, setReclist] = useState(
    localStorage.getItem("Recent")?.split(",")
  );
  const [render, setRender] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const { recentTable, weatherdata } = useWeather();
  const handleIconClick = () => {
    setLike(liked ? like - 1 : like + 1);
    setLiked(!liked);
  };

  return (
    <Container>
      <Navbar />
      {recentList.current.length === 0 ? (
        <Main>
          <Box>
            <No src={Nothing} />
            <None>No Recent Searches</None>
          </Box>
        </Main>
      ) : (
        <Main>
          <Recent>You recently searched for</Recent>
          <Clear onClick={() => setPopUp(true)}>Clear All</Clear>
          <PopRecent trigger={popUp} setTrigger={setPopUp} />
          <Card>
            <Part1></Part1>
            <Part2>
              <Img />
              {/*src={`http://openweathermap.org/img/w/${weatherdata.weather[0]?.icon}.png`}*/}
              <Tem>
                {/*{Math.floor(weatherdata.main?.temp)}*/}
                <sup>o</sup>C
              </Tem>
              <Detail>{/* {weatherdata.weather[0]?.main}*/}</Detail>
            </Part2>
            <Fav>
              {liked ? (
                <AiFillHeart
                  style={{ color: "#fad05b", fontSize: 21 }}
                  onClick={handleIconClick}
                />
              ) : (
                <AiOutlineHeart
                  style={{ color: "#ffffff", fontSize: 21 }}
                  onClick={handleIconClick}
                />
              )}
            </Fav>
          </Card>
        </Main>
      )}
    </Container>
  );
};
export default RecentSearches;

const Box = styled.div`
  height: 130px;
  width: 167px;
  margin-left: 517px;
`;
const No = styled.img`
  height: 84px;
  width: 159px;
  display: inline-block;
  margin: 3px;
`;
const None = styled.h1`
  height: 21px;
  width: 167px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 21px;
  text-align: center;
  display: inline-block;
  padding-top: 13px;
`;
const Part2 = styled.img`
  display: flex;
  position: absolute;
  height: 38px;
  width: 262px;
  background-color: pink;
  left: 35%;
`;
const Img = styled.div`
  height: 38px;
  width: 36px;
  margin-right: 28px;
  background-color: black;
`;
const Tem = styled.div`
  height: 38px;
  width: 47px;
  color: #ffffff;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 38px;
  margin-right: 29px;
  background-color: green;
`;
const Detail = styled.a`
  height: 25px;
  width: 108px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 18px;
  letter-spacing: 0;
  line-height: 21px;
  margin: auto 0;
  background-color: violet;
`;

const Container = styled.div`
  text-align: center;
  margin: 0 12rem;
  height: 100vh;
  @media screen and (max-width: 1200px) {
    text-align: center;
    margin: 0 12rem;
    height: 100vh;
    display: flex;
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
`;
const Clear = styled.a`
  position: absolute;
  color: #ffffff;
  font-family: Roboto;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.2rem;
  right: 10px;
`;
const Recent = styled.a`
  position: absolute;
  color: #ffffff;
  font-family: Roboto;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.2rem;
  left: 5px;
`;
const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  height: 60px;
  margin: 0 10px;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.3);
  position: relative;
  top: 30px;
  @media screen and (max-width: 768px) {
    display: flex;
    width: 40.2rem;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
  }
`;
const Part1 = styled.a`
  position: absolute;
  display: flex;
  align-items: center;
  color: #ffe539;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.2rem;
  left: 2%;
`;

const Fav = styled.div`
  display: flex;
  position: absolute;
  right: 2%;
`;
