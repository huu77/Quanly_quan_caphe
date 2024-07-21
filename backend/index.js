// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

// Middleware 
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const routers = require('./src/modules/router')
require('./src/config/index')
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/v1',routers)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
