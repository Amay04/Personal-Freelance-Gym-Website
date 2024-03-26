import  express from "express";
import path from "path";
import { config } from "dotenv";


export const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(),"public")))
config({
    path:"./data/config.env"
  });



app.get("/",(req , res)=>{
    res.render("demo")
})




