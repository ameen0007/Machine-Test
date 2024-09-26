import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
const router=express.Router();

import employeeRouter from '../src/routes/employeeRoute.js'
import connectDB from './config/db.js';

const app = express();
import cors from 'cors';

connectDB();

// Initialize Express app

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));


// Middleware to parse JSON
app.use(express.json());


// Employee Routes
app.use('/api/employees',employeeRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});