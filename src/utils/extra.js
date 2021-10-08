import React, { useState, useEffect } from "react";
import "./MainPage.css";
import styled from "styled-components";
import { ScaleLoader } from "react-spinners";
import heat from "../Images/icon_temperature_info.png";
import pre from "../Images/icon_precipitation_info.png";
import humid from "../Images/icon_humidity_info.png";
import wind from "../Images/icon_wind_info.png";
import visibility from "../Images/icon_visibility_info.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useSharedCounter } from "../Navbar/Navigation";
import { useBetween } from "use-between";
import NavigationBar from "../Navbar/Navigation";
export const useCounters = () => useBetween(useShareable);

const useShareable = () => {
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favoriteTable, setFavoriteTable] = useState([]);
  return {
    like,
    liked,
    setLiked,
    setLike,
    favoriteTable,
    setFavoriteTable,
  };
};

const MainPage = () => {
  const { like, liked, setLiked, setLike } = useBetween(useShareable);
  const { weatherdata, loading, getData2 } = useSharedCounter();

  const handleIconClick = (e) => {
    setLike(liked ? like - 1 : like + 1);
    setLiked(!liked);
  };
  const handleFavoriteIcon = (e) => {
    getData2();
  };
  useEffect(() => {
    handleFavoriteIcon();
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <div className="loader-container">
            <ScaleLoader size={200} color={"#fff"} loading={loading} />
          </div>
        ) : (
          <>
            {weatherdata !== null ? (
              <div>
                {/*<NavigationBar />*/}
                <Text>
                  {weatherdata.name},{weatherdata?.sys?.country}
                </Text>
                <Fav onClick={handleIconClick}>
                  {liked ? (
                    <>
                      <FavoriteIcon
                        style={{ color: "#fad05b" }}
                        onClick={handleFavoriteIcon}
                        liked={liked}
                      />
                      <Favorite1>{like}Add to favourite</Favorite1>
                    </>
                  ) : (
                    <>
                      <FavoriteBorderIcon style={{ color: "#ffffff" }} />
                      <Favorite>Add to favourite</Favorite>
                    </>
                  )}
                </Fav>

                <>
                  <Center>
                    <Sunny
                      src={`http://openweathermap.org/img/w/${weatherdata?.weather[0]?.icon}.png`}
                    />
                    <Temp>
                      <Degree>{Math.floor(weatherdata?.main?.temp)}</Degree>
                      <Box>
                        <Icon>
                          <Cel>
                            <sup>o</sup>C
                          </Cel>
                          <Far>
                            <sup>o</sup>F
                          </Far>
                        </Icon>
                      </Box>
                    </Temp>
                    <Wheather>{weatherdata?.weather[0]?.main}</Wheather>
                  </Center>
                  <Line />
                  <Bottomlist>
                    <Heat>
                      <H src={heat} />
                      <H1>
                        Min-Max {Math.floor(weatherdata?.main?.temp_max)}-
                        {Math.floor(weatherdata?.main?.temp_min)}
                      </H1>
                    </Heat>
                    <Precipitation>
                      <P src={pre} />
                      <P1>
                        Precipitation{" "}
                        {Math.floor(weatherdata?.main?.feels_like)}%
                      </P1>
                    </Precipitation>
                    <Humid>
                      <Hu src={humid} />
                      <Hu1>
                        Humidity {Math.floor(weatherdata?.main?.humidity)}%
                      </Hu1>
                    </Humid>
                    <Wind>
                      <W src={wind} />
                      <W1>Wind {Math.floor(weatherdata?.wind?.speed)}mph</W1>
                    </Wind>
                    <Visibility>
                      <V src={visibility} />
                      <V1>
                        Visibility {Math.floor(weatherdata?.visibility / 1000)}
                        mph
                      </V1>
                    </Visibility>
                  </Bottomlist>
                </>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};
export default MainPage;

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
const Line = styled.line`
  box-sizing: border-box;
  height: 1px;
  width: 960px;
  border: 1px solid #ffffff;
  opacity: 0.3;
  left: 128px;
  top: 550px;
  position: absolute;
`;
const Text = styled.a`
  height: 24px;
  width: 153px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-align: center;
  top: 203px;
  left: 116px;
  position: absolute;
`;
const Fav = styled.div`
  height: 17px;
  width: 133px;
  position: relative;
  top: 35px;
  left: 131px;
`;
const Favorite = styled.a`
  height: 15px;
  width: 94px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 15px;
  position: absolute;
`;
const Favorite1 = styled.a`
  height: 15px;
  width: 108px;
  color: #fad05b;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 15px;
`;
const Center = styled.div`
  margin: 20px 520px;
  height: 205px;
  width: 134px;
`;
const Sunny = styled.img`
  //margin-left: 550px;
  // margin-top: 70px;
  height: 84px;
  width: 80px;
  display: flex;
  align-items: center;
  padding-left: 27px;
`;
const Temp = styled.div`
  margin: 0 auto;
  height: 75px;
  width: 134px;
  padding-top: 4px;
`;
const Degree = styled.a`
  margin: 0 auto;
  height: 74px;
  width: 73px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 64px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 75px;
`;
const Box = styled.div`
  height: 30px;
  width: 55px;
  margin-left: 73px;
  margin-top: -50px;
`;
const Icon = styled.div`
  height: 31px;
  width: 55px;
  display: flex;
  align-items: center;
`;
const Cel = styled.p`
  box-sizing: border-box;
  height: 30px;
  width: 28px;
  border: 1px solid #ffffff;
  border-radius: 2px 0 0 2px;
  color: #ffffff;
  padding: 4px;
`;
const Far = styled.p`
  box-sizing: border-box;
  height: 30px;
  width: 28px;
  border: 1px solid #ffffff;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e32843;
  padding: 4px;
`;
const Wheather = styled.a`
  height: 25px;
  width: 132px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 22px;
  letter-spacing: 0;
  line-height: 25px;
  text-align: center;
  display: inline-block;
  margin-top: 15px;
`;
const Bottomlist = styled.div`
  height: 175px;
  width: 767px;
  margin-top: -50px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-left: 212px;
  position: relative;
`;

const Heat = styled.div`
  height: 49px;
  width: 108px;
  display: flex;
  align-items: top;
`;
const H = styled.img`
  height: 32px;
  width: 16px; ;
`;
const H1 = styled.h1`
  height: 18px;
  width: 66px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 18px;
  padding: 5px;
`;
const Precipitation = styled.div`
  height: 50px;
  width: 127px;
  display: flex;
  align-items: top;
`;
const P = styled.img`
  height: 29px;
  width: 30px;
`;
const P1 = styled.h1`
  height: 18px;
  width: 85px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 18px;
  padding: 5px;
`;
const Humid = styled.div`
  height: 49px;
  width: 95px;
  display: flex;
  align-items: top;
`;
const Hu = styled.img`
  height: 25px;
  width: 19px;
`;
const Hu1 = styled.h1`
  height: 18px;
  width: 60px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  padding: 5px;
`;
const Wind = styled.div`
  height: 50px;
  width: 108px;
  display: flex;
  align-items: top;
`;
const W = styled.img`
  height: 22px;
  width: 32px;
`;
const W1 = styled.h1`
  height: 18px;
  width: 34px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  padding: 5px;
`;
const Visibility = styled.div`
  height: 50px;
  width: 120px;
  display: flex;
  align-items: top;
`;
const V = styled.img`
  height: 20px;
  width: 34px;
`;
const V1 = styled.h1`
  height: 18px;
  width: 56px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  padding: 5px;
`;
