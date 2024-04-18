import express from "express";
import { contactus, login, logout, myschedule, register, sendquery } from "../controllers/user.js";

const router = express.Router();

router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/new",register)

router.get("/login", (req , res)=>{
    res.render("login");
})

router.post("/login", login)

router.get("/logout", logout)

router.get("/myschedule" , myschedule)

router.get("/contactus", contactus)

router.post("/contactus" ,sendquery )

export default router;