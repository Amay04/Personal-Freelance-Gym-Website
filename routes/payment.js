import  express  from "express";
import axios from "axios";
import uniqid from "uniqid";
import sha256 from "sha256";
const router = express.Router();

router.get("/pay", (req, res) => {
    const payeEndpoint = "/pg/v1/pay";
  
    const merchantTransactionId = uniqid();
  
    const userid = 123;
  
    const payload = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userid,
      amount: 10000,
      redirectUrl: `http://localhost:${process.env.PORT}/redirect-url/${merchantTransactionId}`,
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
        console.log(response.data);
        const url = response.data.data.instrumentResponse.redirectInfo.url;
        res.redirect(url);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  
router.get("/redirect-url/:merchantTransactionId", (req, res) => {
    const { merchantTransactionId } = req.params;
    console.log("merchanttransactionId", merchantTransactionId);
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
            //redirect user to frontend success page
            res.send("<h1>Payment Sucessfull</h1>");
          } else if (response.data.code === "PAYMENT_ERROR") {
            //redirect to failure page
            res.send("<h1>Payment Failed</h1>");

          } else {
            //pending page
          }
          res.send(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  
    //   res.send(merchantTransactionId)
    } else {
      res.send({ error: "error" });
    }
  });
  

  export default router;