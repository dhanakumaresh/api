const express = require('express')
const app = express();
const port = 3000;
let a;

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/client', (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
