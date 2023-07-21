const jwt = require("jsonwebtoken");
const getUrl = require("../utils/constant");
const verifingToken = async function (req, resp, next) {
  try {
    console.log("get url sectre",getUrl.jwtsecret)
    const token = req.header("x-auth-token");
    if (token) {
        const decoded = jwt.verify(token, getUrl.jwtsecret);
        req.user = decoded;
        next();
    } else {
      return null
    }
  } catch (ex) {
    resp.status(400).send("Invalid token.");
  }
};
module.exports = verifingToken;
