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
      validate: {
        len: [10],
        notNull: true,
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isIn: [["shopOwner", "user"]],
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isIn: [["male", "female"]],
        notEmpty: true,
      },
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        notNull: true,
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "email does not  have proper formate",
        },
        notNull: true,
        notEmpty: true,
      },
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  });
  return userdata;
};
