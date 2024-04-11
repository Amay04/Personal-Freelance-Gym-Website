import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true
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
    }
});

export const Plan = mongoose.model("Plan",planSchema);