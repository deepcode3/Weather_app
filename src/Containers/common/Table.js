import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import FavouriteActive from "../../Images/icon_favourite_Active.svg";
import Favourite from "../../Images/icon_favourite.png";
import Sunny from "../../Images/icon_mostly_sunny.svg";
import Rain from "../../Images/icon_rain_big.svg";
import MostlyCloudy from "../../Images/icon_mostly_cloudy_big.svg";
import PartlyCloudy from "../../Images/icon_partially_cloudy_big.svg";
import Thunderstorm from "../../Images/icon_thunderstorm_big.svg";
import Clear from "../../Images/icon_clear_night.svg";

const Table = ({ list }) => {
  let location = useLocation();

  return (
    <Wrapper>
      {list.map((fav, index) => {
        if (fav.weather) var id = fav.weather[0].id;
        console.log(id);
        if (id >= 200 && id <= 232) {
          var icon = Thunderstorm;
          console.log("Thunder");
        } else if (id >= 300 && id <= 531) {
          var icon = Rain;
          console.log("Rain");
        } else if (id === 800) {
          var icon = Clear;
          console.log("Clear");
        } else if (id === 801 || id === 802) {
          var icon = PartlyCloudy;
          console.log("PartlyCloudy");
        } else if (id === 803 || id === 804) {
          var icon = MostlyCloudy;
          console.log("Mostly cloudy");
        } else {
          var icon = Sunny;
          console.log("Sunny");
        }
        return (
          <span className="fav-details-list">
            <div className="flex-1">
              <span className="fav-location">{fav.name}</span>
              <div className="flex-2">
                <img src={icon} className="fav-icon" />
                <span className="temperature">
                  <span className="fav-temp">{Math.floor(fav.main?.temp)}</span>
                  <span className="unit">⁰C</span>
                </span>
                <span className="fav-text">{fav.weather[0]?.description}</span>
              </div>
            </div>
            <div className="flex-3">
              <img
                src={
                  localStorage
                    .getItem("Favourites")
                    .split(",")
                    .includes(fav.name)
                    ? FavouriteActive
                    : Favourite
                }
                className="fav-favicon"
              />
            </div>
          </span>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 16px;
  .fav-details-list {
    width: 100%;
    height: 73px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-bottom: 1px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
  .flex-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
  }
  .flex-2 {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }
  .flex-3 {
    margin-top: auto;
    margin-bottom: auto;
    padding-right: 2rem;
  }
  .fav-icon {
    vertical-align: middle;
    place-self: center;
    height: 36px;
    width: 3.8rem;
  }
  .fav-favicon {
    vertical-align: middle;
    place-self: center;
    margin-top: auto;
    margin-bottom: auto;
  }
  .fav-location {
    height: 19px;
    width: 154px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 19px;
    margin-left: 15px;
    margin-top: auto;
    margin-bottom: auto;
  }
  .fav-temp {
    height: 38px;
    width: 37px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 38px;
  }
  .unit {
    height: 19px;
    width: 11px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
    margin-left: 4px;
  }
  .fav-text {
    height: 21px;
    width: 108px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 21px;
    text-align: left;
    white-space: nowrap;
    margin-top: auto;
    margin-bottom: auto;
  }
  .temperature {
    place-self: center;
  }
  @media all and (max-width: 750px) {
    .fav-details-list {
      display: flex;
      flex-direction: row;
    }
    .flex-1 {
      display: flex;
      flex-direction: column;
    }
    .flex-2 {
      padding-left: 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 2rem;
    }
    .fav-location {
      height: 1.8rem;
      color: rgba(255, 229, 57, 1);
      font-family: Roboto;
      font-size: 1.8rem;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 1.8rem;
    }
  }
`;

export default Table;
