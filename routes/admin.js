import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/admin",async(req,res)=>{
    const allUser = await User.find()
    res.render("admin" , {allUser});
})

router.get("/addplans", (req,res)=>{
    res.render("addPlans");
})

router.get("/showplans", (req,res)=>{
    res.render("showplans");
})


router.get("/addschedule", (req,res)=>{
    res.render("addSchedule");
})

router.get("/manageuser", (req,res)=>{
    res.render("manageUser");
})

router.get("/manageSchedule", (req,res)=>{
    res.render("manageSchedule");
})

export default router;