import { app } from "./app.js"
import { connectDB } from "./data/database.js";

//databse conncection

connectDB();



app.listen("3000", ()=>{
    console.log("Server is Running");
});