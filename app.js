const express = require('express');

const { Customers } = require("./models");

const app = express();
const port = 3000;


app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/customer', async(req, res) => {
  const customer_data = req.body;
  try {
    await Customers.create(customer_data);
    console.log('succesfully created customerdata');
    res.send('successfully created the data')
  } catch (error) {
    console.log('failed creating customerdata');
    throw new Error(error);
  }
});

app.get('/customer/:project_id', async(req, res) => {
  const { project_id } = req.params;
  try {
    const customer_data = await Customers.findOne({ where: {project_id}, raw:true});
    console.log('succesfully retrieved customerdata');
    res.send(customer_data);
  } catch (error) {
    console.log('failed retrieving customerdata');
    throw new Error(error);
  }
});

app.get('/customer', async(req, res) => {

  try {
    const customer_data = await Customers.findAll({ raw:true});
    console.log('succesfully retreived all customerdata');
    res.send(customer_data);
  } catch (error) {
    console.log('failed retrieving all customerdata');
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
