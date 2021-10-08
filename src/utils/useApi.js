import { useState } from "react";
import getWeatherData from "../Services/api";
import Thunderstorm from "../Images/icon_thunderstorm_small.svg";
import Rain from "../Images/icon_rain_small.svg";
import Clear from "../Images/icon_clear_night_small.svg";
import PartlyCloudy from "../Images/icon_partly_cloudy_small.svg";
import Sun from "../Images/icon_mostly_sunny_small.svg";
import MostlyCloudy from "../Images/icon_mostly_cloudy_small.svg";
const useApi = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState();
  const [rec, setRec] = useState([]);
  const [localList, setLocalList] = useState(
    localStorage.getItem("Favourites")?.split(",")
  );
  //const recentList = localStorage.getItem("Recent")?.split(",");
  const handleChange = () => {
    setCity();
  };

  const getData = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      console.log("Main data", data);
      data === undefined ? setWeatherData("error") : setWeatherData(data);
      if (city !== "") setRec([...rec, data.name]);
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
  };
  return {
    city,
    setCity,
    weatherData,
    setWeatherData,
    getData,
    icon,
    setIcon,
    rec,
    setRec,
    localList,
    setLocalList,
    handleChange,
  };
};
export default useApi;
