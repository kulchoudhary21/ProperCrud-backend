const db = require("../../db/db");
const product = db.products;
const Validation = require("../../utils/errorMessage");
async function deleteProduct(req,resp){
    try {
        const id = req.params.id;
        //console.log("idd:", id);
        const data = await product.update(
          { isDelete: true },
          {
            where: {
              id: id,
            },
          }
        );
        resp.status(200).json({
          message: "deleted suucessfully",
          status: 200,
        });
      } catch (err) {
        const msg = Validation(err);
        resp.status(400).json({
          message: msg,
          status: 400,
        });
      }
}
module.exports=deleteProduct