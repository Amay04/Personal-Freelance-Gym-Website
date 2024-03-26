import  express from "express";
import path from "path";

export const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(),"public")))



app.get("/",(req , res)=>{
    res.render("demo")
})


