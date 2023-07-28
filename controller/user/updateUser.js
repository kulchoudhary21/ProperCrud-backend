const path = require("path");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const userData = db.userdata;
async function updateUser(req, resp) {
  try {
    //console.log("req.body", req.body);
    //console.log("req.files", req.files);

    if (req.files) {
      const file = req.files.myfile;
      //console.log(file);
      var uniquefileName = Date.now() + "_" + file.name;
      var pathname = path.join(
        __dirname,
        "../../assets/userDataImages",
        uniquefileName
      );
      file.mv(pathname, (err) => {
        if (err) {
          //console.error("err image uploading..:", er);
        } else {
          //console.log("successfull updated image");
        }
      });
      const updateData = {
        name: req.body.name,
        username: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        image: uniquefileName,
        updatedAt: Date.now(),
      };
      const data = await userData.update(updateData, {
        where: {
          id: req.body.id,
        },
      });
    } else {
      //console.log("else");
      //console.log("--", req.body);
      //console.log(req.body);
      const data = await userData.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      //console.log("data1", data);
    }
    resp.status(200).json({
      message: "created suucessfully",
      status: 200,
    });
  } catch (err) {
    //console.log("error....: ", err.message);
    const msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = updateUser;
