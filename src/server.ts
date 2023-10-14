import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dataRouter from './routes/weather';
import picturesRouter from './routes/pictures';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

          
cloudinary.config({ 
  cloud_name: 'db797lmh6', 
  api_key: '855899367186722', 
  api_secret: 'JYSxfaSt4lDQTrze3FV-cUTahmQ' 
});

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/weather', dataRouter);
app.use('/pictures', picturesRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});