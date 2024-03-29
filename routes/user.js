import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";


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

router.get("/me",getMyProfile)

export default router;