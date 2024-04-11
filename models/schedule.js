import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    plan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
    },
    link:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const Schedule = mongoose.model("Schedule",scheduleSchema);