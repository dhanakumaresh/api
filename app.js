const express = require('express');
const cors = require('cors')

const router = require("./routes")
const { Customers } = require("./models");
const { sendEmail } = require("./handlers/email.handler");

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: '*'
}));

// app.use(function(req, res, next) {
//   res.set("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// }); 


app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});