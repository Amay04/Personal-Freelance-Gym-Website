import express from "express";
import { login, logout, register } from "../controllers/user.js";


const router = express.Router();

router.get("/register",(req,res)=>{
    res.render("registration")
})

router.post("/new",register)

router.get("/login", (req , res)=>{
    res.render("login");
})

router.post("/login", login )

router.get("/logout", logout )


export default router;