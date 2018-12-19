const express = require('express');
const app = express();


const mainConfig = require('./config/main-config');

mainConfig.init(app, express);
module.exports = app;