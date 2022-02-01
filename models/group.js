"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Group.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      list: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
