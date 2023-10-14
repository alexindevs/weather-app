import express from 'express';
const dataRouter = express.Router();
import { getWeatherToday, getFiveDayForecast, probabilityOfRainToday } from '../controllers/weatherData.js'; // Note the .js extension

// Define weather routes
dataRouter.get('/today/:lat/:lon', getWeatherToday);
dataRouter.get('/forecast/:lat/:lon', getFiveDayForecast);
dataRouter.get('/probabilityOfRain/:lat/:lon', probabilityOfRainToday);

export default dataRouter;