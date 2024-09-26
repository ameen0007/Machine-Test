import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI='mongodb+srv://ameencrews:ameen%40123@cluster0.vzjcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;



// doSphDbsRgL18WcD
// ameencrews