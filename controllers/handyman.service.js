const _ = require('lodash');

const { Customers, Handymen } = require("../models");
const { sendEmail } = require("../handlers/email.handler");
const { success, created, failure } = require("../handlers/response.handler");

const handymanService = () => {

    async function createProject(req, res) {
        const customer_data = req.body;
        
        const { 
          salutation, 
          first_name, 
          last_name,
          email,
          city,
          street,
          house_number,
          postal_code, 
          birth_year,
          location,
          household_role,
          ...handymanInfo
        } = customer_data;

        try {
          let customerInfo = {
            salutation,
            first_name, 
            last_name,
            email,
            city,
            street,
            house_number,
            postal_code, 
            birth_year,
            location,
            household_role
          };

          let customer = await Customers.findOne({ where: { email }, raw: true });
          if(!_.isEmpty(customer)) {
            await Customers.update(customerInfo,{ where: { email } });
          }else {
            await Customers.create(customerInfo);
          };
          console.log('succesfully created customerdata');
          
          const { articles, offer_details, handymen } = handymanInfo;

          const finalDetails = {
            ...handymanInfo,
            ...customerInfo,
            articles: JSON.stringify(articles),
            offer_details: JSON.stringify(offer_details),
            handymen: JSON.stringify(handymen)
          };

          await Handymen.create(finalDetails);
          console.log('succesfully created handymendata');

          handymen.forEach(({ email }) => {
            sendEmail(email);
          });
          console.log('succesfully sent data to handymen email');

          let response = JSON.parse(JSON.stringify(success));
          let { _httpStatus, _body } = response;
          _body.message =  'Request status' +_body.message;
          return res.status(_httpStatus).send(_body); 
        } catch (error) {
          console.log('failed creating customerdata', error);
          let response = JSON.parse(JSON.stringify(failure));
          let { _httpStatus, _body } = response;
          _body.message =  'Request status :' +_body.message;
          return res.status(_httpStatus).send(_body);  
        }
    };

    async function readProject(req, res) {
        const { project_id } = req.params;
        try {
          const customer_data = await Handymen.findOne({ where: {project_id}, raw:true});
          console.log('succesfully retrieved customerdata');
          res.send(customer_data);
        } catch (error) {
          console.log('failed retrieving customerdata');
          throw new Error(error);
        }
    };

    async function readAllProject(req, res) {
        try {
          console.log('succesfully retreived all customerdata');
          const customer_data = await Handymen.findAll({ raw:true});
          res.send(customer_data);
        } catch (error) {
          console.log('failed retrieving all customerdata');
          throw new Error(error);
        }
    };

    return {
        createProject,
        readProject,
        readAllProject
    };
};

module.exports = exports = handymanService();