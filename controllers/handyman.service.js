const _ = require('lodash');
const uuid = require('uuid');

const { Customers, HandymanInvoice, HandymanData } = require("../models");
const { sendEmail } = require("../handlers/email.handler");
const { success, created, failure } = require("../handlers/response.handler");

const _calculation = (offer_details,articles) => {
  // first map articles then u will get sperate elemnet/object and then destructure 
  // the object by getting material, cost aand so on 
  // then call the function from there and return total
  // after total is returned, add total in that specific article ex: total: 1000
  // finally return articles
}


const handymanService = () => {

    async function createProject(req, res) {

        let { customer_data, handymen_data, offer_details, articles, project_id } = req.body;

        try {  
          
          let customer = await Customers.findOne({ where: { email: customer_data.email }, raw: true });
          if(!_.isEmpty(customer)) {
            console.log('updating customer data on dB');
            // await Customers.update(customer_data,{ where: { email1 } });
            console.log('succesfully updated customer data on dB');
          }else {
            console.log('creating customer data on dB');
            await Customers.create(customer_data);
            console.log('succesfully created customer data on dB');
          };        
          

          handymen_data.map(async(handyman_data) => {
            let invoice_data = {};
            let { company, email } = handyman_data;
            let invoice_id = uuid.v4();
            articles = await _calculation(articles);
            invoice_data['company'] = company;
            invoice_data['invoice_id'] = invoice_id;
            invoice_data['project_id'] = project_id;
            invoice_data['customer_data'] = JSON.stringify(customer_data);
            invoice_data['handyman_data'] = JSON.stringify(handyman_data);
            invoice_data['offer_details'] = JSON.stringify(offer_details);
            invoice_data['articles'] = JSON.stringify(articles);
            
            console.log('creating handyman invoice data on dB');
            await HandymanInvoice.create(invoice_data);
            console.log('succesfully created handyman invoice on dB');

            await sendEmail(email,project_id,invoice_id);
            console.log('succesfully sent data to handymen email',invoice_id);
          });

          let response = JSON.parse(JSON.stringify(success));
          let { _httpStatus, _body } = response;
          _body.message =  'created_poject' +_body.message;
          return res.status(_httpStatus).send(_body); 
        } catch (error) {
          console.log('failed creating invoice data', error);
          let response = JSON.parse(JSON.stringify(failure));
          let { _httpStatus, _body } = response;
          _body.message =  'created_poject' +_body.message;
          return res.status(_httpStatus).send(_body);  
        }
    };

    async function readProject(req, res) {
        const { project_id, invoice_id } = req.params;
        try {
          let invoice_data = await HandymanInvoice.findOne({ where: {project_id, invoice_id}, raw:true});
          invoice_data.articles = invoice_data.articles && JSON.parse(invoice_data.articles);
          invoice_data.updated_articles = invoice_data.updated_articles && JSON.parse(invoice_data.updated_articles);
          invoice_data.customer_data = invoice_data.customer_data && JSON.parse(invoice_data.customer_data);
          invoice_data.handyman_data = invoice_data.handyman_data && JSON.parse(invoice_data.handyman_data);
          invoice_data.offer_details = invoice_data.offer_details && JSON.parse(invoice_data.offer_details);

          let { company, email } = invoice_data.handyman_data;
          const handyman = await HandymanData.findOne({ where: {company, email}, raw:true});
          if(_.isEmpty(handyman)) throw new Error('no data received from handyman dB');
          invoice_data['handyman_data'] = handyman;

          console.log('succesfully retrieved handyman invoice');
          let response = JSON.parse(JSON.stringify(success));
          let { _httpStatus, _body } = response;
          _body.message = 'Read_Data' +_body.message;
          _body._data = invoice_data;
          return res.status(_httpStatus).send(_body); 
        } catch (error) {
          console.log('failed retrieving handyman invoice');
          throw new Error(error);
        }
    };

    async function registerHandymen(req, res) {
      const handymen = req.body;
      try {
        handymen.forEach(async(handyman) => {
          console.log('creating handyman invoice data on dB');
          let x = await HandymanData.create(handyman);
          console.log('succesfully created handyman invoice on dB',x);
        });

        let response = JSON.parse(JSON.stringify(success));
        let { _httpStatus, _body } = response;
        _body.message = 'created_all_handyman_Data' +_body.message;
        return res.status(_httpStatus).send(_body); 
      } catch (error) {
        console.log('failed creating handyman data');
        throw new Error(error);
      }
  };

    async function readAllProject(req, res) {
      try {
        const invoice_data = await HandymanData.findAll({raw: true});
        console.log('succesfully retreived all customerdata');
        let response = JSON.parse(JSON.stringify(success));
        let { _httpStatus, _body } = response;
        _body.message =  'Read_all_Data' +_body.message;
        _body._data = invoice_data;
        return res.status(_httpStatus).send(_body); 
      } catch (error) {
        console.log('failed retrieving all customerdata',error);
        let response = JSON.parse(JSON.stringify(failure));
        let { _httpStatus, _body } = response;
        _body.message =  'Read_all_Data :' +_body.message;
        return res.status(_httpStatus).send(_body);  
      }
    }

     async function deleteAllProject(req, res) {
       const { project_id } = req.params;
       try {
         await Handymen.destroy({ where: {project_id}, raw:true});
         console.log('succesfully deleted all customerdata');
         let response = JSON.parse(JSON.stringify(success));
         let { _httpStatus, _body } = response;
         _body.message =  'Delete_all_Data'+_body.message;
         return res.status(_httpStatus).send(_body); 
       } catch (error) {
         console.log('failed deleting data',error);
         let response = JSON.parse(JSON.stringify(failure));
         let { _httpStatus, _body } = response;
         _body.message =  'Delete_all_Data'+_body.message;
         return res.status(_httpStatus).send(_body);  
       }
   };

    return {
        createProject,
        readProject,
        readAllProject,
        deleteAllProject,
        registerHandymen
    };
};

module.exports = exports = handymanService();