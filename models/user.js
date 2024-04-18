import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    },

    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    subscription :{
        plan:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Plan",
        },
        startDate : {
            type:Date,
        },
        endDate: {
            type:Date,
        },
    },
});

export const User = mongoose.model("User",schema);