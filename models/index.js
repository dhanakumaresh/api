const Sequelize = require('sequelize');

const customerConfig = {
  host: "localhost",
  database: "joto",
  username: "root",
  password: "Test123#",
  dialect: "mysql",
  logging: false
};

const sequelize = new Sequelize(customerConfig.database, customerConfig.username, customerConfig.password, customerConfig);

sequelize.authenticate()
.then(() => {
  console.log('Database: connection established.');
})
.catch((err) => {
  console.log('Database: unable to establish connection noting error: ', err);
});

const Customers = require('./customer.model')(sequelize, Sequelize);
module.exports = { Customers }