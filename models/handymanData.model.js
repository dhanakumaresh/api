const definitionsModel = require('../models/definitions/handymanData.definitions');

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
  return sequelize.define(`handyman_data`, tableDefinitions, { timestamps: false, freezeTableName: true });
};