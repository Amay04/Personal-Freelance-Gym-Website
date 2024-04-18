import mongoose from "mongoose";

const dietSchema = mongoose.Schema({
    meal1:{
        type:String,    
    },
    meal2:{
        type:String
    },
    meal3:{
        type:String,    
    },
    meal4:{
        type:String,
    },
})

export const Diet = mongoose.model("Diet" ,dietSchema);