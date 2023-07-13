const path = require("path");
const db = require("../db/db");
const userData = db.userdata;
const Validation=require("../utils/errorMessage")
async function createUser(req, resp) {
  try {
    // console.log("req.body",req.body)
    // console.log("req.files",req.files.file)
    const file = req.files.myfile;
    // console.log(file);
    var uniquefileName = Date.now() + "_" + file.name;
    var pathname = path.join(
      __dirname,
      "../assets/userDataImages",
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
    console.log("--", req.body.name);
    console.log(req.body);
    const data = await userData.create(req.body);
    resp.status(200).json({
      message: "created suucessfully",
      status: 200,
    });
    console.log("data1", data);
  } catch (err) {
    console.log("error....: ", err);
    let msg=Validation(err)
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = createUser;
