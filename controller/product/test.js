const { userdata, products } = require("../../db/db");
async function test(req, resp) {
  const data = await userdata.findAll({
    attributes: ["id", "username", "name"],
    include: {
      model: products,
      attributes: ["id", "productName", "productModel"],
    },
  });
  resp.status(200).json({
    status: 200,
    data,
  });
}
module.exports = test;
