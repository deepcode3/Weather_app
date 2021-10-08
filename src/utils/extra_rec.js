import React, { useEffect } from "react";
import styled from "styled-components";
//import Nothing from "../Images/icon_nothing.png";
import { useSharedCounter } from "../Navbar/Navigation";
import NavigationBar from "../Navbar/Navigation";

const RecentSearches = () => {
  const { recentTable } = useSharedCounter();

  useEffect(() => {
    const search = localStorage.getItem("data");
    let savedPerson = JSON.parse(search);
    console.log("place name:", savedPerson.name);
  }, []);

  return (
    <>
      <NavigationBar />
      <Main>
        {weatherdata ? (
          <ul>
            {recentTable.map((item) => (
              <li>
                <Card key={item.id}>
                  {item.value.name},{item.value.sys?.country},
                  <Sun
                    src={`http://openweathermap.org/img/w/${item.value.weather[0]?.icon}.png`}
                  />
                  {Math.floor(item.value.main?.temp)}
                  <sup>o</sup>C,
                  {item.value.weather[0]?.main}
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <Box>
            <No src={Nothing} />
            <None>No Recent Searches</None>
          </Box>
        )}
      </Main>
    </>
  );
};
export default RecentSearches;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: fit-content;
  height: 545px;
  @media (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
  }
`;
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
const Card = styled.div`
  height: 73px;
  width: 960px;
  opacity: 0.2;
  background-color: #ffffff;
`;
const Sun = styled.img`
  height: 38px;
  width: 36px;
  display: flex;
  align-items: center;
`;
