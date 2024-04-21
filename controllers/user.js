import {User} from "../models/user.js";

import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { Schedule } from "../models/schedule.js";
import { Query } from "../models/queries.js";
import { Diet } from "../models/diet.js";


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

    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(404).render("login" , {error : "Incorrect Password"})

    if(user.role == "admin") return res.redirect("/admin");


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


export const contactus = async(req ,res)=>{
  try{
    res.render("contact")

  }catch(e){
    console.log(e);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });

  }
}

export const sendquery = async (req, res) => {
  try {
    const { name, email, number, message } = req.body;

    await Query.create({
      name,
      email,
      number,
      message,
    });

    res.redirect("/");
  } catch (e) {
    console.log(e)
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getMySchedule = async(req,res)=>{
//   try{
//   const schedule = await Schedule.find({plan:req.user.subcription.plan});

//   res.render("userschedule", {schedule});
//   }catch(e){
// console.log(e)
  // }
  try {
    const schedule = await Schedule.find({ plan: req.user.subscription.plan }).populate('plan');
    res.render('userschedule', { schedule });
  } catch (error) {
    console.error(error);
  }
}

export const getDiet = async(req,res)=>{
  try{
  const diet = await Diet.find();
  res.render("meal", {diet});
  }catch(e){
console.log(e)
  }
}

