const { Sequelize, DataTypes } = require("sequelize");
const userdata = require("../models/userdata");
const usercart = require("../models/usercart");
const sequelize = new Sequelize("USER", "root", "Admin@123", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userdata = require("../models/userdata")(sequelize, DataTypes);
db.products = require("../models/product")(sequelize, DataTypes);
db.usercart = require("../models/usercart")(sequelize, DataTypes);
db.sequelize
  .sync()
  .then(() => {
    console.log("tables created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
console.log("db.userdata", db.userdata);
console.log("db.products", db.products);
console.log("db.usercart", db.usercart);

//-----------one to many---------//
db.userdata.hasMany(db.products, { foreignKey: "shopOwnerId" });
db.products.belongsTo(db.userdata, { foreignKey: "shopOwnerId" });

///------------relation cart to userdata and products-------------////
// db.usercart.belongsTo(db.userdata, {
//   foreignKey: "userId",
//   constraint: false,
// });

db.usercart.belongsTo(db.products, {
  foreignKey: "productId",
  constraint: false,
});

// /------------relation  userdata and products to usercart------------////
db.userdata.hasMany(db.usercart, {
  foreignKey: "userId",
});

// db.products.hasMany(db.usercart, {
//   foreignKey: "userId",
// });

// db.usercart.belongsTo(db.userdata, {
//   foreignKey: "userId",
// });

// db.usercart.belongsTo(db.products, {
//   foreignKey: "userId",
// });

// db.usercart.belongsToMany(db.userdata, {
//   through: {
//       model: db.products
//   },
//   foreignKey: 'userId'
// });

module.exports = db;
