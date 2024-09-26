import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
   
    department: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    hiringDate:{
        type:Date,
        required:true
    }
}, { timestamps: true });

export default mongoose.model('Employee', EmployeeSchema);