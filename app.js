import  express from "express";
import path from "path";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";


config({
    path:"./data/config.env"
  });

export const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(express.static(path.join(path.resolve(),"public")))


app.set("view engine", "ejs");




//Using routes
app.use(userRouter);




app.get("/",(req , res)=>{
    res.render("home")
})




