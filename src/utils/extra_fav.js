import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import Nothing from "../Images/icon_nothing.png";
import { useCounters } from "./MainPage"; //******/
import { useSharedCounter } from "../Navbar/Navigation";
import Pop from "./FavouritePopup";
import NavigationBar from "../Navbar/Navigation";

const Favorites = () => {
  const [popUp, setPopUp] = useState(false);
  const { weatherdata } = useSharedCounter();
  const { favoriteTable, setFavoriteTable } = useCounters();

  const recent = localStorage.getItem("favorite");
  let favoriteData = JSON.parse(recent);
  console.log("place name favorite:", favoriteData.name);

  const addDataFavorite = () => {
    setFavoriteTable([
      ...favoriteTable,
      { id: favoriteTable.length, value: favoriteData },
    ]);
  };

  useEffect(() => {
    addDataFavorite();
    console.log("console favorite");
  }, []);

  return (
    <>
      <NavigationBar />
      <Main>
        <Remove onClick={() => setPopUp(true)}>Remove All</Remove>
        <Pop trigger={popUp} setTrigger={setPopUp} />
        <ul>
          {favoriteTable.map((item) => (
            <li>
              <Card key={item.id}>
                {item.value.name},{item.value.sys?.country},
                <Sun
                  src={`http://openweathermap.org/img/w/${item.value.weather[0]?.icon}.png`}
                />
                ,{Math.floor(item.value.main?.temp)}
                <sup>o</sup>C,
                {item.value.weather[0]?.main}
              </Card>
            </li>
          ))}
        </ul>

        {/* 
        <Box>
          <No src={Nothing} />
          <None>No Favourites added</None>
        </Box>
    )}*/}
      </Main>
    </>
  );
};
export default Favorites;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  width: fit-content;
  height: 545px;
  position: relative;
  @media (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
  }
`;
const Remove = styled.a`
  position: relative;
  height: 15px;
  width: 66px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 15px;
  text-align: right;
  left: 1004px;
`;

/*const Box = styled.div`
  height: 130px;
  width: 167px;
  margin-left: 517px;

  left: 120px;
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
`;*/
const Card = styled.div`
  height: 73px;
  width: 960px;
  opacity: 0.2;
  background-color: #ffffff;
  position: relative;
  top: 50px;
`;
const Sun = styled.img`
  height: 38px;
  width: 36px;
  display: flex;
  align-item: center;
`;
const Text = styled.a`
  height: 15px;
  width: 144px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 13px;
  letter-spacing: 0;
  line-height: 15px;
`;
