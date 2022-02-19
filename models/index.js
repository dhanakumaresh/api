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

const invoiceConfig = {
  host: "localhost",
  database: "handymen",
  username: "root",
  password: "Test123#",
  dialect: "mysql",
  logging: false
};


const sequelize_customer = new Sequelize(customerConfig.database, customerConfig.username, customerConfig.password, customerConfig);

sequelize_customer.authenticate()
.then(() => {
  console.log('Customer_Database: connection established.');
})
.catch((err) => {
  console.log('Customer_Database: unable to establish connection noting error: ', err);
});

const sequelize_handymen = new Sequelize(invoiceConfig.database, invoiceConfig.username, invoiceConfig.password, invoiceConfig);

sequelize_handymen.authenticate()
.then(() => {
  console.log('Service_Database: connection established.');
})
.catch((err) => {
  console.log('Service_Database: unable to establish connection noting error: ', err);
});

const Customers = require('./customers.model')(sequelize_customer, Sequelize);
const HandymanInvoice = require('./HandymanInvoice.model')(sequelize_handymen, Sequelize);
const HandymanData = require('./HandymanData.model')(sequelize_handymen, Sequelize);

HandymanInvoice.hasMany(HandymanData, { foreignKey: 'company' });
HandymanData.belongsTo(HandymanInvoice, { foreignKey: 'company' });

module.exports = { Customers, HandymanInvoice, HandymanData }