import express from "express";
import { User } from "../models/user.js";
import { addSchedule, addplan, createSchedule, deleteDiet, deletePlan, deleteQuery, deleteSchedule, deleteUser, displaySchedule, getquery, sendDiet, showDiet, showplan, viewDiet } from "../controllers/admin.js";
import { upload } from "../utils/multer.js";
import { Plan } from "../models/plans.js";
const router = express.Router();

router.get("/admin",async(req,res)=>{
    const allUser = await User.find({role:"user"}).populate('subscription.plan');
    const subscriptionCount = await User.countDocuments({ 'subscription.plan': { $exists: true } });
    const plan = await Plan.find();
    res.render("admin",{allUser,plan, subscriptionCount});
});

//Manage Plan
router.get("/addplans", (req,res)=>{
    res.render("addPlans");
});

router.post("/addplans", upload.single('coverimage'), addplan);


router.get("/showplans", showplan);

router.get("/managePlans/delete/:id",deletePlan);

// Manage Schedule

router.get("/addschedule",addSchedule);

router.post("/addschedule",createSchedule);



router.get("/manageSchedule",displaySchedule );

router.get("/manageSchedule/delete/:id", deleteSchedule);

//manage User
router.get("/manageuser", async (req,res)=>{
    let users = await User.find({role:"user"});
    res.render("manageUser", {users});
});

router.get("/manageUser/delete/:id", deleteUser);

//query

router.get("/getquery" , getquery);

router.get("/query/delete/:id",deleteQuery);

router.get("/addDiet",viewDiet);

router.post("/addDiet" , sendDiet);

router.get("/showdiet", showDiet);

router.get("/diet/delete/:id",deleteDiet);


export default router;