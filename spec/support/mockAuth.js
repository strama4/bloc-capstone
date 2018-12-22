module.exports = {
    fakeInit(app) {
        let email;
        let id;

        function middleware(req, res, next) {
            id = req.body.id || id;
            email = req.body.email || email;

            if (id && id != -1) {
                req.user = {
                    'id': Number.parseInt(id),
                    'emaill': email
                }
            } else if (id === -1) {
                delete req.user;
            }
            if (next) { next() }
        }
        function route(req, res) {
            res.redirect('/');
        }
        
        app.use(middleware);
        app.get('/auth/fake', route);
    }
}