const Sequelize = require('sequelize');

const sequelize = new Sequelize('angularASM', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
