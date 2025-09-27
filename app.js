import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { isValisJson } from './middlewares/middlewares.js';
import carsRoute from './route/carsRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(isValisJson);
app.use('/cars', carsRoute);

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log('Server running on port:', PORT);
        });
    })
    .catch(error => console.error('MongoDB connection error:', error));