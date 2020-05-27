const { expect } = require('chai')
const retrieveProduct = require('./retrieve-product')

describe("retrieveProduct", function() {
    var randomProductId;

    it("should succeed on retrieving a product based on its id", async () => {
        randomProductId = Math.floor(Math.random() * 5) + 1;

        let product = await retrieveProduct(randomProductId) 
        expect(product).to.be.instanceof(Object);
        expect(product.id).to.equal(randomProductId);

    });

    it("should fail to retrieve the product if it does not exist based on the id", async () => {
        randomProductId = Math.random();

        let error = await retrieveProduct(randomProductId)

        expect(error).to.be.defined();
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.equal("product with id " + randomProductId + " does not exist");  
    });

    it("should fail to retrieve the product if the first parameter is not a number", function() {
        randomProductId = "some string";
        expect(function() { retrieveProduct(randomProductId)}).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = undefined;
        expect(function() { retrieveProduct(randomProductId)}).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = function(){};
        expect(function() { retrieveProduct(randomProductId)}).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = null;
        expect(function() { retrieveProduct(randomProductId)}).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = [];
        expect(function() { retrieveProduct(randomProductId)}).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = {};
        expect(function() { retrieveProduct(randomProductId)}).to.throw(TypeError, randomProductId + " is not a number");
    });

    
});