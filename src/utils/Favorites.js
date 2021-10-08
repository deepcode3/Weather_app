import React, { useState, useRef } from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navigation";
import Table from "./List";
import Nothing from "../Images/icon_nothing.svg";
import axios from "axios";
import { useHistory } from "react-router";

import { useWeather } from "../Navbar/Navigation";
import Pop from "./FavouritePopup";
import useApi from "./useApi";

const Favorites = () => {
  const {} = useWeather();
  const { localList, setLocalList } = useApi();
  const [popUp, setPopUp] = useState(false);
  const FavouriteList = useRef([]);
  // const [favList, setFavlist] = useState(
  //   localStorage.getItem("Favourites")?.split(",")
  // );
  const [render, setRender] = useState(false);
  const history = useHistory();

  if (localList) {
    const lists = localList.map((fav) => {
      return axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${fav}&units=metric&appid=2c4838d1d400345df0010c064351315b`
        )
        .then((res) => res.data)
        .catch((e) => console.error(e));
    });
    Promise.all(lists).then((res) => {
      FavouriteList.current = res;
      setRender(true);
    });
  }

  const handleChange = (value) => {
    history.push({ pathname: "/", state: { value: value } });
  };

  const handleSelect = (e) => {
    localStorage.removeItem("Favourites");
    setLocalList([]);
  };

  return (
    <Container>
      <Navbar handleChange={handleChange} />
      <Main>
        {FavouriteList.current.length === 0 ? (
          <Box>
            <No src={Nothing} />
            <None>No Recent Searches</None>
          </Box>
        ) : (
          <>
            <Count>
              {FavouriteList.current.length} City added as favourite
            </Count>
            <Remove onClick={() => setPopUp(true)}>Remove All</Remove>
            <Pop
              trigger={popUp}
              setTrigger={setPopUp}
              handleSelect={handleSelect}
            />
            <Table list={FavouriteList.current} />
            {/* <Card>
          <Part1>Udupi karnataka</Part1>
          <Part2></Part2>
          <Fav style={{ color: "#fad05b" }} />
         </Card>*/}
          </>
        )}
      </Main>
    </Container>
  );
};
export default Favorites;

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
const Remove = styled.a`
  position: absolute;
  color: #ffffff;
  font-family: Roboto;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.2rem;
  right: 10px;
`;
const Count = styled.a`
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
const Part2 = styled.div`
  display: flex;
  position: absolute;
  height: 38px;
  width: 262px;
  background-color: pink;
  left: 35%;
`;
/*const Fav = styled(FavoriteIcon)`
  display: flex;
  position: absolute;
  right: 2%;
`;*/
