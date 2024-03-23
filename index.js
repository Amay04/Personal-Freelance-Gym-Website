import  express from "express";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(),"public")))



app.get("/",(req , res)=>{
    res.render("demo")
})



app.listen("3000", ()=>{
    console.log("Server is Running");
});