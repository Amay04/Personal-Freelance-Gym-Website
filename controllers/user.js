import {User} from "../models/user.js";
import {Plan} from "../models/plans.js";

import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import { Schedule } from "../models/schedule.js";


export const register = async(req , res , next)=>{
    try{
        const{name,email,password} =  req.body;
      
        let user = await User.findOne({email})

        if(user) return res.render("login", {error:"User Already Exist"});

        const hashedPassword = await bcrypt.hash(password , 10);

        user = await User.create({name,email, password:hashedPassword});
    

    sendCookie(user , res , "Registered and Login Successfully", 200)

    }catch(e){
       console.log(e)
    }
}

export const login = async(req,res,next)=>{
   try{
     const {email , password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) return res.render("register" , {error : "Register First"})

   if(user.role == "admin") return res.redirect("/admin");
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(404).redirect("/register");

    sendCookie(user , res , `welcome back ${user.name}`, 200)
   }

catch(e){
    console.log(e)
}
}

export const logout = async(req , res)=>{

    res.status(200).cookie("token" , "" ,{
    expires: new Date(Date.now())
    }).redirect("/");
}

export const getMyProfile = async(req,res)=>{
    const {token} = req.cookies;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id)
    console.log(req.user);
}






export const myschedule = async(req,res)=>{
    try {
        const schedule = await Schedule.find().populate("plan");
    
        res.render("Myschedule", { schedule });
      } catch (e) {
        console.log(e);
        res.status(404).json({
          success: false,
          message: "Something went wrong",
        });
      }
}