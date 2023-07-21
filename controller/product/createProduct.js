const path = require("path");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const products = db.products;
async function createProduct(req, resp) {
  try {
    console.log("bodi headers",req.headers['x-auth-token'])    
    const file = req.files.myfile;
    var uniquefileName = Date.now() + "_" + file.name;
    var pathname = path.join(
      __dirname,
      "../../assets/productDataImages",
      uniquefileName
    );
    file.mv(pathname, (err) => {
      if (err) {
        console.error("err image uploading..:", er);
      } else {
        console.log("successfull updated image");
      }
    });
    req.body.image = uniquefileName;
    console.log("req.bodyinpro",req.body);
    const data = await products.create(req.body);
    console.log("dtdtdt11", data);
    resp.status(200).json({
      message: "created suucessfully",
      status: 200,
    });
  } catch (err) {
    console.log("error....: ", err);
    let msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = createProduct;
