import  express  from "express";

import { paymentHandling, paymentInitiation } from "../controllers/payment.js";
import { isLogin } from "../middlewares/auth.js";
const router = express.Router();

router.get("/pay/:id", isLogin ,paymentInitiation);

  
router.get("/redirect-url/:merchantTransactionId/:userId/:planId", paymentHandling);
  

  export default router;