const _ = require('lodash');
const uuid = require('uuid');

const { Customers, HandymanInvoice, HandymanData } = require("../models");
const { sendEmail } = require("../handlers/email.handler");
const { success, created, failure } = require("../handlers/response.handler");
const { articleCalc, taxCalculation } = require('../utilities/calculations');


const _calculateTax = async (articles_total) => {
  //let articlesobj = articles_total
  console.log('dfsf')
  articles_t = taxCalculation(articles_total);
  let totalSum = Object.assign(articles_total, articles_t)
  //articles_total.push(...articles_t);
  console.log(totalSum)
  return totalSum;
}


const _arbeitenCalucation = (sqm) => {

  let fliesen = articleCalc('fliesen',sqm,2.97,2.7,50,6,75);
  let elektro = articleCalc('elektro',sqm,1,1,45,30,60);
  let trocken = articleCalc('trocken',sqm,1,1,11,5,40); 
  let maler = articleCalc('maler',sqm,3.2,3.2,4.40,10,18.50); 
  let heizung = articleCalc('heizung', sqm,0,0,195,55,75);
  let demontage = articleCalc('demontage', sqm,0,2.7,0,0,20); 
  let sonstiges = articleCalc('sonstiges', sqm,0,1,0,0,30);
  
  let newArticles = [ fliesen, elektro, trocken, heizung, maler, demontage, sonstiges];
  return newArticles;
}

// Calculate cost for different arbeiten

const _calculation = async (offer_details,articles) => {

  articles.forEach(article=>{
    let fliesenExists = _.includes(article,'fliesen_arbeiten');
    if(fliesenExists){
      let newArticles = _arbeitenCalucation(offer_details.sqm);
      articles.push([...newArticles]);
    }else{
      let total = Object.values(article).reduce((acc, curr) => !_.isString(curr) && acc + curr);
      total = Number(_.round(total, 2).toFixed(2));
      let index = _.findIndex(articles, ['article_type', article.article_type]);
      _.set(articles[index],'total',total);
    }
  });
};

const handymanService = () => {

    async function createProject(req, res) {

        let { customer_data, handymen_data, offer_details, articles, articles_total, project_id } = req.body;
        console.log('total:', articles_total)

        try {  
          await _calculation(offer_details,articles);
          let totalSum = await _calculateTax(articles_total);
          console.log(totalSum)
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
            let { company, email } = handyman_data;
            let invoice_data = {};
            let invoice_id = uuid.v4();

            const handyman = await HandymanData.findOne({ where: {company}, raw:true});
            console.log(handyman)
            if(_.isEmpty(handyman)) throw new Error('no data received from handyman dB');
            
            invoice_data['company'] = company;
            invoice_data['invoice_id'] = invoice_id;
            invoice_data['project_id'] = project_id;
            invoice_data['customer_data'] = JSON.stringify(customer_data);
            invoice_data['handyman_data'] = JSON.stringify(handyman);
            invoice_data['offer_details'] = JSON.stringify(offer_details);
            invoice_data['articles'] = JSON.stringify(articles);
            invoice_data['articles_total'] = JSON.stringify(totalSum);
            
            console.log('creating handyman invoice data on dB');
            await HandymanInvoice.create(invoice_data);
            console.log('succesfully created handyman invoice on dB');

            await sendEmail(email,project_id,invoice_id);
            console.log('succesfully sent data to handymen email');
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

    async function updateProject(req, res) {
      const { project_id, invoice_id } = req.params;
      let { customer_data, handyman_data, offer_details, articles, articles_total, updated_articles, updated_total } = req.body;

      try {  
        let invoice_data = {};
        let { company } = handyman_data;
        invoice_data['company'] = company;
        invoice_data['invoice_id'] = invoice_id;
        invoice_data['project_id'] = project_id;
        invoice_data['customer_data'] = JSON.stringify(customer_data);
        invoice_data['handyman_data'] = JSON.stringify(handyman_data);
        invoice_data['offer_details'] = JSON.stringify(offer_details);
        invoice_data['articles'] = JSON.stringify(articles);
        invoice_data['articles_total'] = JSON.stringify(articles_total);
        invoice_data['updated_articles'] = JSON.stringify(updated_articles);
        invoice_data['updated_total'] = JSON.stringify(updated_total);
          
        console.log('updating handyman invoice on dB');
        await HandymanInvoice.update(invoice_data,{ where: {invoice_id,project_id}, raw:true });
        console.log('succesfully updated handyman invoice on dB');

        let response = JSON.parse(JSON.stringify(success));
        let { _httpStatus, _body } = response;
        _body.message =  'updated_articles' +_body.message;
        return res.status(_httpStatus).send(_body); 
      } catch (error) {
        console.log('failed updating handyman invoice', error);
        let response = JSON.parse(JSON.stringify(failure));
        let { _httpStatus, _body } = response;
        _body.message =  'updated_articles' +_body.message;
        return res.status(_httpStatus).send(_body);  
      }
  };
    async function readProject(req, res) {
        const { project_id, invoice_id } = req.params;
        try {
          let invoice_data = await HandymanInvoice.findOne({ where: {project_id, invoice_id}, raw:true});
          invoice_data.articles = invoice_data.articles && JSON.parse(invoice_data.articles);
          invoice_data.articles_total = invoice_data.articles_total && JSON.parse(invoice_data.articles_total);
          invoice_data.updated_articles = invoice_data.updated_articles && JSON.parse(invoice_data.updated_articles);
          invoice_data.updated_total = invoice_data.updated_total && JSON.parse(invoice_data.updated_total);
          invoice_data.customer_data = invoice_data.customer_data && JSON.parse(invoice_data.customer_data);
          invoice_data.handyman_data = invoice_data.handyman_data && JSON.parse(invoice_data.handyman_data);
          invoice_data.offer_details = invoice_data.offer_details && JSON.parse(invoice_data.offer_details);

          console.log('succesfully retrieved handyman invoice', invoice_data);
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
        const { project_id } = req.params;
        try {
        const invoice_data = await HandymanInvoice.findAll({where: {project_id}, raw: true});
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
      updateProject,
      readProject,
      readAllProject,
      deleteAllProject,
      registerHandymen
    };
};

module.exports = exports = handymanService();