const { expect } = require('chai')

describe("addToCart", () => {
    var data, randomProductId;

    before(function () {
        call("../../public/data/data.json", undefined, function(error, response) {
            data = JSON.parse(response.content);
        })
    });

    it("should succeed on adding an specific product to the cart. When done so, it should disable the product to be added again", function(done) {
        randomProductId = data[Math.floor(Math.random() * data.length)].id;

        addToCart(randomProductId, function(error) {
            expect(error).to.be.undefined;

            expect(context.cart).to.exist;
            expect(context.cart).to.be.instanceof(Array);
            expect(context.cart[0]).to.equal(randomProductId);

            done();
        })
    });

    it("should fail to add the product to the cart if it has already been added to it", function(done) {
        addToCart(randomProductId, function(error) {
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal("product with id " + randomProductId + " is already in the cart");

            done();
        })
    });

    it("should fail to add the product to the cart if the product does not exist", function(done) {
        randomProductId = Math.random()
        addToCart(randomProductId, function(error) {
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal("product with id " + randomProductId + " does not exist");

            done();
        })
    });

    it("should fail to add the product to the cart if the ID passed is not a number", function() {
        randomProductId = "some string";
        expect(function() { addToCart(randomProductId, function() {}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = undefined;
        expect(function() { addToCart(randomProductId, function() {}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = [];
        expect(function() { addToCart(randomProductId, function() {}) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = {};
        expect(function() { addToCart(randomProductId, function() {}) }).to.throw(TypeError, randomProductId + " is not a number");
    });

    after(function() {
        context.cart.length = 0;
    });
}.bind(context))