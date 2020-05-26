const { expect } = require('chai')

describe("retrieveProduct", function() {
    var randomProductId;

    it("should succeed on retrieving a product based on its id", function(done) {
        randomProductId = Math.floor(Math.random() * 5) + 1;

        retrieveProduct(randomProductId, function(error, product) {
            expect(error).to.be.undefined;

            expect(product).to.exist;
            expect(product).to.be.instanceof(Object);
            expect(product.id).to.equal(randomProductId);

            done();
        });
    });

    it("should fail to retrieve the product if it does not exist based on the id", function(done) {
        randomProductId = Math.random();

        retrieveProduct(randomProductId, function(error, product) {
            expect(product).to.be.undefined;

            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal("product with id " + randomProductId + " does not exist");

            done();
        });
    });

    it("should fail to retrieve the product if the first parameter is not a number", function() {
        randomProductId = "some string";
        expect(function() { retrieveProduct(randomProductId, function(){}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = undefined;
        expect(function() { retrieveProduct(randomProductId, function(){}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = function(){};
        expect(function() { retrieveProduct(randomProductId, function(){}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = null;
        expect(function() { retrieveProduct(randomProductId, function(){}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = [];
        expect(function() { retrieveProduct(randomProductId, function(){}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = {};
        expect(function() { retrieveProduct(randomProductId, function(){}) }).to.throw(TypeError, randomProductId + " is not a number");
    });

    
});