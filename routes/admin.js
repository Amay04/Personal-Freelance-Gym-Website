import express from "express";
import { User } from "../models/user.js";
import { addSchedule, addplan, createSchedule, deleteSchedule, displaySchedule, showplan } from "../controllers/admin.js";

const router = express.Router();

router.get("/admin",async(req,res)=>{
    const allUser = await User.find()
    res.render("admin" , {allUser});
})

router.get("/addplans", (req,res)=>{
    res.render("addPlans");
});

router.post("/addplans", addplan);



router.get("/showplans", showplan);

// Manage Plans

router.get("/addschedule",addSchedule);

router.post("/addschedule",createSchedule);

router.get("/manageuser", (req,res)=>{
    res.render("manageUser");
})

router.get("/manageSchedule",displaySchedule );

router.get("/manageSchedule/delete/:id", deleteSchedule);

export default router;