const request = require('request');
const base = 'http://localhost:3000';
const server = require('../../src/server')

describe('Routes : static', () => {
    it('should render the landing page', (done) => {
        request.get(base, (err, res, body) => {
            expect(body).toContain('Not a registered user?');
            done();
        });
    });
});