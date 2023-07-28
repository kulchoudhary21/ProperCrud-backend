const path = require("path");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const userData = db.userdata;
const passwordBycrpt = require("../../utils/passwordBycrpt");
async function createUser(req, resp) {
  try {
    let hasCode = "";
    const hashPasswd = passwordBycrpt(req.body.passwd);
    await hashPasswd.then((encode) => {
      hasCode = encode;
    });
    const file = req.files.myfile;
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
    //console.log("---", hasCode);
    req.body.passwd = hasCode;
    req.body.image = uniquefileName;
    //console.log("-uu-", req.body.userType);
    //console.log(req.body);
    const data = await userData.create(req.body);
    //console.log("dtdtdt", data);
    resp.status(200).json({
      message: "created suucessfully",
      status: 200,
    });
  } catch (err) {
    //console.log("error....: ", err);
    let msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = createUser;
