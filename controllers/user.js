import User from "./models/user.js";
import bcrypt from "bcrypt";

export const register = async(req , res , next)=>{
    try{
        const{name,email,password} =  req.body;
        let user = await User.findOne({email});

        if(user) return res.redirect("/login")

        const hashedPassword = await bcrypt.hash(password , 10);

        user = await User.create({name,email, password:hashedPassword});
        console.log(user)
        return res.status(200);

    }catch(e){

    }
}
