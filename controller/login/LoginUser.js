const { userdata } = require("../../db/db");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Validation = require("../../utils/errorMessage");
const getUrl = require("../../utils/constant");
const CryptoJS = require("crypto-js");
async function LoginUser(req, resp) {
  try {
    console.log("req login", req.body);
    const data = await userdata.findAll({
      where: {
        username: req.body.username,
      },
    });
    console.log("datain", data[0].dataValues);
    if (data[0].dataValues) {
      const hashPassword = data[0].dataValues.passwd;
      const compare = await bcrypt.compare(req.body.passwd, hashPassword);
      if (compare) {
        const user = {
          id: data[0].dataValues.id,
          username: data[0].dataValues.username,
          name: data[0].dataValues.name,
          email: data[0].dataValues.email,
          gender: data[0].dataValues.gender,
          userType: data[0].dataValues.userType,
        };
        console.log("uuuuuuuu", user);
        const token = await jwttoken(user);
        const crpto = await crypto(user);
        console.log("ccc", crpto);
        console.log("tokennnn", token); // return true
        resp.status(200).json({
          message: "login suucessfully",
          status: 200,
          token: token,
          userdataAccess: crpto,
        });
      } else {
        resp.status(400).json({
          message: "Password incorrect",
          status: 400,
        });
      }
    } else {
      resp.status(400).json({
        message: "Username incorrect",
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
    let msg = Validation(err);
    console.log("eee", err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}

async function jwttoken(user) {
  console.log("user...", getUrl.secre);
  let token = await jwt.sign(user, getUrl.jwtsecret);
  console.log("token:", token);
  return token;
}
async function decryptjwttoken(token) {
  if (!token) {
    return null;
  } else {
    return await jwt.verify(token, getUrl.cryptojs);
  }
}
async function crypto(user) {
  let string = JSON.stringify(user);
  const encrypted = await CryptoJS.AES.encrypt(
    string,
    getUrl.cryptojs
  ).toString();
  console.log("---", encrypted);
  return encrypted;
}
module.exports = LoginUser;
