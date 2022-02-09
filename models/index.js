//sequelize used for database
const Sequelize = require('sequelize');

const customerConfig = {
  host: "localhost",
  database: "customers",
  username: "root",
  password: "Test123#",
  dialect: "mysql",
  logging: false
};

const serviceConfig = {
  host: "localhost",
  database: "handymen",
  username: "root",
  password: "Test123#",
  dialect: "mysql",
  logging: false
};


const sequelize_c = new Sequelize(customerConfig.database, customerConfig.username, customerConfig.password, customerConfig);

sequelize_c.authenticate()
.then(() => {
  console.log('Customer_Database: connection established.');
})
.catch((err) => {
  console.log('Customer_Database: unable to establish connection noting error: ', err);
});

const sequelize_h = new Sequelize(serviceConfig.database, serviceConfig.username, serviceConfig.password, serviceConfig);

sequelize_h.authenticate()
.then(() => {
  console.log('Service_Database: connection established.');
})
.catch((err) => {
  console.log('Service_Database: unable to establish connection noting error: ', err);
});

const Customers = require('./customers.model')(sequelize_c, Sequelize);
const Handymen = require('./handymen.model')(sequelize_h, Sequelize);


module.exports = { Handymen , Customers }