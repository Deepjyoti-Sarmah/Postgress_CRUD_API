const Sequelize = require("sequelize");
const db = require("../utils/database");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
