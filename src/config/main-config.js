require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');
const logger = require('morgan');

module.exports = {
    init(app, express) {
        app.set('view engine', 'ejs');
        app.set('views', viewsFolder);
        app.use(express.static(path.join(__dirname, '..', 'assets')));
        app.use(logger('dev'))
    }
}