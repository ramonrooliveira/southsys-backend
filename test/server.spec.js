const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');
const assert = chai.assert;

const server = require('../server');

chai.use(http);
chai.use(subSet);

const productSchema = {
    name: name => name
};

describe('Unit testing', () => {

    it('/users auth - POST', () => {
        chai.request(server.app)
        .post('/authenticate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'admin', password: 'admin'})
        .end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
        });
    });

    it('/products - GET', () => {
        chai.request(server.app)
        .post('/authenticate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'admin', password: 'admin'}).then(() => {
            chai.request(server.app)
            .get('/products')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.containSubset([productSchema]);
            });
        });
    });

    it('/products - GET with a limit', () => {
        chai.request(server.app)
        .post('/authenticate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'admin', password: 'admin'}).then(() => {
            chai.request(server.app)
            .get('/products/3')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200); 
                chai.expect(res.body.length).to.be.equal(3);
                chai.expect(res.body).to.containSubset(productSchema);
            });
        });
    });

    it('/products - POST with client', () => {
        chai.request(server.app)
        .post('/authenticate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'client', password: 'client'}).then(() => {
            chai.request(server.app)
            .post('/product')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'product5'})
            .end((err, res) => {
                chai.expect(err).to.not.be.null;
                chai.expect(res).to.have.status(500);
            });
        });
    });
});