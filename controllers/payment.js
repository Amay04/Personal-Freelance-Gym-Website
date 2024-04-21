import axios from "axios";
import uniqid from "uniqid";
import sha256 from "sha256";
import jwt from "jsonwebtoken";
import { updateUserSubscription } from "../subscription/controller.js";
import { Plan } from "../models/plans.js";
import { User } from "../models/user.js";


//payment innitiated

export const paymentInitiation = async (req, res) => {

    const payeEndpoint = "/pg/v1/pay";
  
    const merchantTransactionId = uniqid();
    let planId = req.params.id;
    const {token}  = req.cookies;
    
   const decoded = jwt.verify(token,process.env.JWT_SECRET);
   req.user = await User.findById(decoded._id);

    const plan = await Plan.findById(planId);
    let amount = plan.amount;


    let userId = req.user._id;
    const payload = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100,
      redirectUrl: `http://localhost:${process.env.PORT}/redirect-url/${merchantTransactionId}/${userId}/${planId}`,
      redirectMode: "REDIRECT",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
  
    const bufferobj = Buffer.from(JSON.stringify(payload), "utf8");
    const baseEncodedpayload = bufferobj.toString("base64");
    const xverify = sha256(baseEncodedpayload + payeEndpoint + process.env.SALT_KEY) + "###" + process.env.SALT_INDEX;
  
    const options = {
      method: "post",
      url: `${process.env.PHONE_PE_URL}${payeEndpoint}`,
      headers: {
        accept: "application/json",
        "content-Type": "application/json",
        "X-VERIFY": xverify,
      },
      data: {
        request: baseEncodedpayload,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const url = response.data.data.instrumentResponse.redirectInfo.url;
        res.redirect(url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  export const paymentHandling = (req, res) => {
    const { merchantTransactionId, userId , planId} = req.params;

    if (merchantTransactionId) {
      const xverify =
        sha256(
          `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` + process.env.SALT_KEY
        ) +
        "###" +
        process.env.SALT_INDEX;
  
      const options = {
        method: "get",
        url: `${process.env.PHONE_PE_URL}/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-MERCHANT_ID": merchantTransactionId,
          "X-VERIFY": xverify,
        },
      };
  
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          if (response.data.code === "PAYMENT_SUCCESS") {
            updateUserSubscription(userId, planId);
            //redirect user to frontend success page
            res.render("success")
          } else if (response.data.code === "PAYMENT_ERROR") {
            res.render("failure")
          } else {
            //pending page
          }
       
        })
        .catch(function (error) {
          console.log(error);
        });
  
    } else {
      res.send({ error: "error" });
    }
  }