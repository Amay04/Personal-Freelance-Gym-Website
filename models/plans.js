import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    image:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    description1:{
        type:String,
    },
    description2:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    duration:{
        type: Number,
        required:true,
    }
});

export const Plan = mongoose.model("Plan",planSchema);