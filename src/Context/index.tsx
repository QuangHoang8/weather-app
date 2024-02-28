import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface StateContext {
  weather: WeatherInfo;
  setPlace: (value: React.SetStateAction<string>) => void;
  location: string;
  values: WeatherInfo[];
  place: string;
}

const initialValue: StateContext = {
  weather: { conditions: "", wspd: 0, humidity: 0, temp: 0, datetime: 0 },
  location: "",
  values: [],
  place: "",
  setPlace: () => {},
};

interface WeatherInfo {
  conditions: string;
  wspd: number;
  humidity: number;
  temp: number;
  heatIndex?: string;

  datetime: number;
}

interface WeatherData {
  locations: {
    [k: string]: {
      address: string;
      values: WeatherInfo[];
    };
  };
}

interface StateContextProviderProps {
  children: JSX.Element;
}

const StateContext = createContext<StateContext>(initialValue);

export const StateContextProvider = (props: StateContextProviderProps) => {
  const { children } = props;
  const [weather, setWeather] = useState({
    conditions: "",
    wspd: 0,
    humidity: 0,
    temp: 0,
    datetime: 0,
  });
  const [values, setValues] = useState<WeatherInfo[]>([]);
  const [place, setPlace] = useState("HaNoi,VN,2024");
  const [location, setLocation] = useState("");

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast`,
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
        key: import.meta.env.VITE_API_KEY,
      },
    };
    try {
      const response = await axios.request<WeatherData>(options);
      console.log("response: ", response);
      const thisData = Object.values(response.data.locations)[0];
      console.log("thisData: ", thisData);

      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
    } catch (error) {
      console.error("Error: ", error);
      //If API throws errors
      alert("This place does not exits");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{ weather, setPlace, location, values, place }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
