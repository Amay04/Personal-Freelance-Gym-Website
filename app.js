import  express from "express";
import path from "path";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middlewares/auth.js";
import jwt from "jsonwebtoken"
import {User} from "./models/user.js"



config({
    path:"./data/config.env"
  });

export const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(),"public")));
app.use(checkForAuthenticationCookie("token"));


app.set("view engine", "ejs");


//Using routes
app.use(userRouter);




app.get("/",async(req , res)=>{
  const { token } = req.cookies;

  if (!token) return res.render("home");
   

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
  
   let user = await User.findById(decoded._id);
   
    return res.render("home",{user});
  });




