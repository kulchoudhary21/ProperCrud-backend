const { userdata, products } = require("../../db/db");
async function test2(req, resp) {
  const data = await products.findAll({
    attributes: ["id", "productName", "productModel"],
    include: {
      model: userdata,
      attributes: ["id", "username", "name"],
    },
  });
  resp.status(200).json({
    status: 200,
    data,
  });
}
module.exports = test2;
