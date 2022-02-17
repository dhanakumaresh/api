const express = require('express');
const customer = express.Router({ mergeParams: true });


const { handymanService } = require('../controllers');

customer.post('/',  handymanService.createProject);
  
customer.get('/:project_id', handymanService.readProject);
  
customer.get('/', handymanService.readAllProject);
customer.delete('/:project_id', handymanService.deleteAllProject);

module.exports = customer;