const bcrypt = require("bcrypt");
let hashPasswd = "";
async function hashing(passwd) {
  //console.log("function calling");
  await bcrypt
    .hash(passwd, 10)
    .then((hash) => {
      hashPasswd = hash;
      //console.log("Hash ", hash);
    })
    .catch((err) => console.error(err.message));
  return hashPasswd;
}
module.exports = hashing;
