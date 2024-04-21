import { app } from "./app.js"
import { connectDB } from "./data/database.js";
import { removeExpiredSubscription } from "./subscription/service.js";

//databse conncection

connectDB();

setInterval(removeExpiredSubscription, 24 * 60 * 60 * 1000);

app.listen("3000", ()=>{
    console.log("Server is Running");
});