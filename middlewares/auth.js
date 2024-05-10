import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req,res, next)=>{
   const {token} = req.cookies;

   if(!token) return next();

   const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next()
}


export const isLogin = async (req,res, next)=>{
   const {token} = req.cookies;

   if(!token) return res.render("login", {error:"please login before buying Plan"})

    next()
}