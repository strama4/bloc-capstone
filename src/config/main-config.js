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
            cookie: { maxAge: 8.64e+7 },
            secret: 'the secret',
        }));
        app.use(flash());
        passportConfig.init(app);

        app.use((req, res, next) => {
            res.locals.currentUser = req.user
            next();
        })
    }
}