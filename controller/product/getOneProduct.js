const { products } = require("../../db/db");
const Validation = require("../../utils/errorMessage");
async function getOneProduct(req, resp) {
  try {
    const id = req.params.id;
    //console.log("ididid",id)
    const data = await products.findOne({
      where: { id: id },
      attributes: {
        exclude: ["passwd"],
      },
    });
    resp.status(200).json({
      status: 200,
      data:data
    });
  } catch (err) {
    const msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = getOneProduct;
