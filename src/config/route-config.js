module.exports = {
    init(app) {
        const staticRoutes = require('../routes/staticRoutes');
        const userRoutes = require('../routes/userRoutes');
        const recipeRoutes = require('../routes/recipeRoutes');

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(recipeRoutes);
    }
}