module.exports = {
    init(app) {
        const staticRoutes = require('../routes/staticRoutes');
        const userRoutes = require('../routes/userRoutes');
        const recipeRoutes = require('../routes/recipeRoutes');

        if (process.env.NODE_ENV === 'test') {
            const mockAuth = require('../../spec/support/mockAuth')
            mockAuth.fakeInit(app);
        }

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(recipeRoutes);
    }
}