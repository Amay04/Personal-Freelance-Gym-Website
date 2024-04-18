import  express from "express";
import path from "path";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import paymentRouter from "./routes/payment.js"
import adminRouter from "./routes/admin.js"
import cookieParser from "cookie-parser";
import {Plan} from "./models/plans.js";
import { isAuth } from "./middlewares/auth.js";



config({
    path:"./data/config.env"
  });

export const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(),"public")));
app.use(isAuth);
app.set("view engine", "ejs");


//Using routes
app.use(userRouter);
app.use(adminRouter);
app.use(paymentRouter);


app.get("/",async(req , res)=>{
  
  
  let plans = await Plan.find();
    return res.render("home",{user:req.user , plans });
  });




