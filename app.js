const express = require('express');

const router = require("./routes")
const { Customers } = require("./models");
const { sendEmail } = require("./handlers/email.handler");

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/", router);


// app.post('/customer', async(req, res) => {
//   const customer_data = req.body;
//   const { handyman_1, handyman_2 } = customer_data;
//   try {
//     await Customers.create(customer_data);
//     sendEmail(handyman_1);
//     sendEmail(handyman_2);
//     //sendEmail(handyman_3);
//     console.log('succesfully created customerdata');
//     // response handlers
//     let success = {
//       _httpStatus: 200,
//       _body: {
//           status: 0,
//           message: '_success',
//           _data: {}
//       }
//     };
//     let response = JSON.parse(JSON.stringify(success));
//     let { _httpStatus, _body } = response;
//     _body.message =  'create data' +_body.message;
//     return res.status(_httpStatus).send(_body); 
//   } catch (error) {
//     console.log('failed creating customerdata');
//     throw new Error(error);
//   }
// });

// app.get('/customer/:project_id', async(req, res) => {
//   const { project_id } = req.params;
//   try {
//     const customer_data = await Customers.findOne({ where: {project_id}, raw:true});
//     console.log('succesfully retrieved customerdata');
//     res.send(customer_data);
//   } catch (error) {
//     console.log('failed retrieving customerdata');
//     throw new Error(error);
//   }
// });

// app.get('/customer', async(req, res) => {
//   try {
//     const customer_data = await Customers.findAll({ raw:true});
//     console.log('succesfully retreived all customerdata');
//     res.send(customer_data);
//   } catch (error) {
//     console.log('failed retrieving all customerdata');
//     throw new Error(error);
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});