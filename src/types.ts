interface MainForecast {
    dt: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number, 
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: ForecastIcon[]
}


interface ForecastIcon {
    id: number,
    main: string,
    description: string,
    icon: string
}



interface CurrentForecast extends MainForecast {
    sunrise: number,
    sunset: number, 
    temp: number,
    feels_like: number,
    visibility: number,
}


interface HourlyForecastItem extends MainForecast {
    pop: number,
    temp: number,
    feels_like: number,
    visibility: number,
}

interface DailyTemperature {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
}
interface DailyFeelsLike {
    day: number,
    night: number,
    eve: number,
    morn: number
}


interface DailyForecastItem extends MainForecast {
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: DailyTemperature,
    feels_like: DailyFeelsLike,
    pop: number,
    rain: number,
}


interface MainInfo {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset:number,
}


type HourlyForecast = HourlyForecastItem[]

type DailyForecast = DailyForecastItem[]



interface GeneralForecast extends MainInfo{
    hourly: HourlyForecast,
    daily: DailyForecast,
    current: CurrentForecast
}



interface LocationData {
    city: string,
    country: string
}

interface SavedCityData {
    cityName: string,
    regionName: string, 
    countryName: string,
    latitude: number,
    longitude: number,
    timeZone: string,
    id: string,
    image: string
}
  



type OptionsDay = {
    weekday: "long" | "short" | "narrow" | undefined;
}
type OptionsDate = {
    month: "long" | "short" |undefined
}

type ErrorType = Error | null




  
              

