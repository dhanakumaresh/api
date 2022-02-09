const express = require('express');

const router = require("./routes")
const { Customers } = require("./models");
const { sendEmail } = require("./handlers/email.handler");

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});