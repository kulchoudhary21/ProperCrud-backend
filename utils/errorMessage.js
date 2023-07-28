function Validation(err) {
  let msg = "";
  if (err.errors) {
    err.errors.forEach((error) => {
      //console.log("eeeeee", error.message);
      switch (error.validatorKey) {
        case "len":
          msg = "Username max length should be 10";
          break;

        case "not_unique":
          msg = `${error.path} should be unique`;
          break;

        case "is_null":
          msg = `${error.path} should not be null`;
          break;

        case "isIn":
          msg = "Gender should be male or female only";
          break;

        case "min":
          msg = `${error.path} size greater than ${error.validatorArgs[0]}`;
          break;

        case "notEmpty":
          msg = `${error.path} should not be empty string`;
          break;

        default:
          msg = error.message;
      }
    });
  } else {
    //console.log("ooooo", err.message);
    msg+=err.message
  }
  return msg;
}
module.exports = Validation;
