import  express  from "express";

import { payment, updateSubscription } from "../controllers/payment.js";

import {isLogin} from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-order", payment);

router.get('/isLoggedIn', isLogin, (req, res) => {

  res.json({ isLoggedIn: true });
});

router.get('/success',(req, res) =>{
  res.render("success");
});

router.post("/update-subscription", updateSubscription);
  
  export default router;