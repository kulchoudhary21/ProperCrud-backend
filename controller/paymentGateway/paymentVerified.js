const Razorpay = require("razorpay");
const getUrl = require("../../utils/constant");
async function paymentVerified(req, resp) {
  try {
    //console.log("success api")
    const instance = new Razorpay({
      key_id: getUrl.KeyID,
      key_secret: getUrl.KeySecret,
    });
    //console.log("paym",req.body.razorpayPaymentId)
    const id = req.body.razorpayPaymentId
    //console.log(id);
    const order = await instance.payments.fetch(id);
    if (!order) return resp.status(500).send("Something wrong occured");
    else {
      resp.status(200).json({ success: true, data: order });
    }
  } catch (err) {
    //console.log("error ..",err)
  }
}
module.exports = paymentVerified;
