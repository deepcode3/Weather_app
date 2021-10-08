import axios from "axios";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "2c4838d1d400345df0010c064351315b";

const getWeatherData = async (city_name) => {
  try {
    const { data } =
      city_name === ""
        ? await axios.get(baseUrl + `q=udupi&appid=${apiKey}&units=metric`)
        : await axios.get(
            baseUrl + `q=${city_name}&appid=${apiKey}&units=metric`
          );
    return data;
  } catch (error) {
    throw error;
  }
};
export default getWeatherData;
