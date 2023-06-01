import Rain from '../assets/images/backgrounds/rain.jpg';
import Storm from '../assets/images/backgrounds/storm.jpg';
import Mist from '../assets/images/backgrounds/mist.jpg';
import Sky from '../assets/images/backgrounds/sun.jpg';
import LightClouds from '../assets/images/backgrounds/lightClouds.jpg';
import DarkClouds from '../assets/images/backgrounds/arkClouds.jpg';
import Snow from '../assets/images/backgrounds/snow.jpg';



export const getWeatherBackground = (forecastImage:string) => {

        if (/^2/.test(forecastImage)) {
            return Storm;
        }
        if (/^(3|5)/.test(forecastImage)) {
            return Rain;
        }
        if (/^6/.test(forecastImage)) {
            return Snow;
        }
        if (/^7/.test(forecastImage)) {
            return Mist;
        }
        if (/800/.test(forecastImage)) {
            return Sky;
        }
        if (/^(801|802)/.test(forecastImage)) {
            return LightClouds;
        }
        if (/^(803|804)/.test(forecastImage)) {
            return DarkClouds;
        }
    }