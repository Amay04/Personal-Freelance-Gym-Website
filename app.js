import  express, { urlencoded } from "express";
import path from "path";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import adminRouter from "./routes/admin.js"
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middlewares/auth.js";
import jwt from "jsonwebtoken"
import {User} from "./models/user.js";
import {Plan} from "./models/plans.js";




config({
    path:"./data/config.env"
  });

export const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(),"public")));
app.use(checkForAuthenticationCookie("token"));


app.set("view engine", "ejs");


//Using routes
app.use(userRouter);
app.use(adminRouter);


app.get("/",async(req , res)=>{
  const { token } = req.cookies;

  let plans = await Plan.find();

  if (!token) return res.render("home",{plans});
   
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
  
   let user = await User.findById(decoded._id);
   
    return res.render("home",{user , plans });
  });




