const { Customers, Handymen } = require("../models");
const { sendEmail } = require("../handlers/email.handler");
const { success, created, failure } = require("../handlers/response.handler");

const handymanService = () => {

    async function createProject(req, res) {
        const customer_data = req.body;
        
        const { salutation, 
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
           ...handymanData} = customer_data;
        
        const { handyman_1, handyman_2 } = handymanData;
        try {
          await Customers.create({
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
          });
          console.log('succesfully created customerdata');
          await Handymen.create(customer_data);
          console.log('succesfully created handymendata');
          sendEmail(handyman_1);
          sendEmail(handyman_2);


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
          const customer_data = await Customers.findOne({ where: {project_id}, raw:true});
          console.log('succesfully retrieved customerdata');
          res.send(customer_data);
        } catch (error) {
          console.log('failed retrieving customerdata');
          throw new Error(error);
        }
    };

    async function readAllProject(req, res) {
        try {
          const customer_data = await Customers.findAll({ raw:true});
          console.log('succesfully retreived all customerdata');
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