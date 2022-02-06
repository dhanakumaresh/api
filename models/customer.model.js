const definitionsModel = require('../models/definitions/customer_definitions');

module.exports = (sequelize, Sequelize) => {
  const tableDefinitions = definitionsModel.reduce((acc, cur) => {
    const { field, ...others } = cur;
    if (others.defaultValue) {
      acc[cur.field] = { ...others, type: Sequelize[others.type], defaultValue: Sequelize[others.defaultValue] };
    } else {
      acc[cur.field] = { ...others, type: Sequelize[others.type] };
    };
    return acc;
  }, {});
  return sequelize.define(`customers`, tableDefinitions, { timestamps: false, freezeTableName: true });
};