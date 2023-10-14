import axios from "axios";
import { Request, Response } from "express"; // Import Request and Response types from Express

const OWM_API = process.env.API_KEY || "a73d102412b04751a4b132328231210";

export const getWeatherToday = async (req: Request, res: Response) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    try {
        const apiKey = OWM_API;

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no&alerts=no`);
        console.log(response.data)
        const weatherData = response.data.current;

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}

    export const getFiveDayForecast = async (req: Request, res: Response) => {
        const lat = req.params.lat;
        const lon = req.params.lon;
        try {
            const apiKey = OWM_API;
            const forecast = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no&alerts=no`);
            console.log(forecast.data);
            const fiveDayForecast = forecast.data.forecast.forecastday;
            res.json(fiveDayForecast);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }

    export const probabilityOfRainToday = async (req: Request, res: Response) => {
        const lat = req.params.lat;
        const lon = req.params.lon;
        try {
            const apiKey = OWM_API;
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&aqi=no&alerts=no`);
            const weatherData = response.data.forecast.forecastday;
            const rainProbability = weatherData[0].day.daily_chance_of_rain;
            console.log(rainProbability)
            res.status(500).json({ rainProbability });
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }