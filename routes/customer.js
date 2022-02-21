const express = require('express');
const customer = express.Router({ mergeParams: true });


const { handymanService } = require('../controllers');

//Create something new in dB
customer.post('/',  handymanService.createProject);

//Update available something on dB
customer.put('/:project_id/:invoice_id',  handymanService.updateProject);
  
//get something from dB
customer.get('/:project_id/:invoice_id', handymanService.readProject);
  
customer.get('/:project_id', handymanService.readAllProject);

//delete something from dB
customer.delete('/:project_id', handymanService.deleteAllProject);

customer.post('/handymen', handymanService.registerHandymen);

module.exports = customer;