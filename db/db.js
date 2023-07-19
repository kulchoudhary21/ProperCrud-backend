const { Sequelize, DataTypes } = require('sequelize');
const userdata = require('../models/userdata');
const sequelize = new Sequelize('USER', 'root', 'Admin@123', {
    host: 'localhost',
    dialect:'mysql'
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
db.products=require("../models/product")(sequelize,DataTypes)
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

//-----------one to many---------//
db.userdata.hasMany(db.products,{foreignKey:'shopOwnerId'})
db.products.belongsTo(db.userdata,{foreignKey:'id'})
module.exports = db;