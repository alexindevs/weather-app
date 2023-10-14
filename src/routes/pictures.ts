import express from 'express';
const picturesRouter = express.Router();
import upload from '../config/multer.js';
import { uploadWeatherInfo, fetchAllPicturesInfo, updatePictureLikes, fetchPictureInfo, getPicturesByLocation, removePictureLikes } from '../controllers/WeatherPictures.js';

// Define weather routes
picturesRouter.get('/location/:location', getPicturesByLocation);
picturesRouter.get('/all', fetchAllPicturesInfo);
picturesRouter.post('/your-weather', upload.single('image'), uploadWeatherInfo);
picturesRouter.get('/info/:id', fetchPictureInfo);
picturesRouter.post("/updateLikes", updatePictureLikes);
picturesRouter.post("/removeLikes", removePictureLikes)

export default picturesRouter;