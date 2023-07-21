const db = require("../../db/db");
const path = require("path");
const Validation = require("../../utils/errorMessage");
const products = db.products;
async function updateProduct(req, resp) {
  try {
    console.log("req.body", req.body);
    console.log("req.files", req.files);

    if (req.files) {
      const file = req.files.myfile;
      console.log("ggggg",file);
      var uniquefileName = Date.now() + "_" + file.name;
      var pathname = path.join(
        __dirname,
        "../../assets/productDataImages",
        uniquefileName
      );
      file.mv(pathname, (err) => {
        if (err) {
          console.error("err image uploading..:", err);
        } else {
          console.log("successfull updated image");
        }
      });
      const updateData = {
        productName: req.body.productName,
        productModel: req.body.productModel,
        productTitle: req.body.productTitle,
        price:req.body.price,
        image: uniquefileName,
        updatedAt: Date.now(),
      };
      const data = await products.update(updateData, {
        where: {
          id: req.body.id,
        },
      });
    } else {
      console.log("else");
      console.log("--", req.body);
      console.log(req.body);
      const data = await products.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      console.log("data1", data);
    }
    resp.status(200).json({
      message: "updated suucessfully",
      status: 200,
    });
  } catch (err) {
    console.log("error....: ", err.message);
    const msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = updateProduct;
