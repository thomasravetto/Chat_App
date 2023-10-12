const express = require('express');
const cors = require('cors');

const api = require('./app/api');

const app = express();

app.use('/v1', api);