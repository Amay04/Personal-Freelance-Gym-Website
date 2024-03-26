import express from "express";
import { register } from "../controllers/user.js";

const router = express.Router();

router.get("/register",(req,res)=>{
    res.render("registration")
} )
router.post("/register", register)