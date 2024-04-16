import mongoose from "mongoose";
const querySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    number:{
        type: String,
        required:true,
    },
    message:{
        type:String,
        required: true
    },
    
});

export const Query = mongoose.model("Query" ,querySchema);