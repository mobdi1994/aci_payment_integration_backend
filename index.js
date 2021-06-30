const winston = require("winston");
const express = require("express");
const app = express();
const checkout = require('./checkout');
const payment = require('./payment');


const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;

require("./cors")(app);

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api", (req, res) => res.send("Hello API World!"));
app.use('/api/checkout', checkout);
app.use('/api/payment', payment);