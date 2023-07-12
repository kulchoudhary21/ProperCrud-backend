module.exports = (sequelize, DataTypes) => {
    const userdata = sequelize.define("userdata", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      paaswd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDelete: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "false"
      },
    });
    return userdata;
  };
  