const Razorpay = require("razorpay");
const getUrl = require("../../utils/constant");
async function paymentOrder(req, resp) {
    console.log("running api..")
    console.log("dscugcuwgcuisw",req.body)
  try {
    const instance = new Razorpay({
      key_id: getUrl.KeyID,
      key_secret: getUrl.KeySecret,
    });
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: req.body.order_id,
        payment_capture: req.body.payment_capture,
      };
      console.log("hohpohoho",req.body)
      const order=await instance.orders.create(options)
      if(!order) resp.status(500).send("Something went wrong..")
      else{
        resp.status(200).json({"success":true,data:order})
      }
  } catch (err) {
    console.log("Errrrrr",err)
  }
}
module.exports = paymentOrder;
// pay_MHvYLzwPALqOJf
