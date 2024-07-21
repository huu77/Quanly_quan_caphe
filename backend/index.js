// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

// Middleware 
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(compression());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
