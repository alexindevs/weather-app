import dotenv from 'dotenv';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dataRouter from './routes/weather';
import picturesRouter from './routes/pictures';
import {v2 as cloudinary} from 'cloudinary';
import quizRouter from './routes/quiz';

dotenv.config();

          
cloudinary.config({ 
  cloud_name: process.env.CDN_API_NAME || "" , 
  api_key: process.env.CDN_API_KEY || "", 
  api_secret: process.env.CDN_API_SECRET || "" 
});

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/weather', dataRouter);
app.use('/pictures', picturesRouter);
app.use('/quiz', quizRouter)

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});