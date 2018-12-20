require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');
const logger = require('morgan');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('express-flash');
const session = require('express-session');
const passportConfig = require('./passport-config');

module.exports = {
    init(app, express) {
        app.set('view engine', 'ejs');
        app.set('views', viewsFolder);
        app.use(express.static(path.join(__dirname, '..', 'assets')));
        app.use(logger('dev'));
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(validator());
        app.use(session({ 
            cookie: { maxAge: 60000 },
            secret: 'the secret',
        }));
        app.use(flash());
        passportConfig.init(app);
    }
}