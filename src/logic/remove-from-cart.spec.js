const { expect } = require('chai')

describe("removeFromCart", function() {
    var data, randomProduct, cart;

    beforeEach(function(done) {
        context.cart.length = 0;

        call("../../public/data/data.json", undefined, function(error, response) {
            data = JSON.parse(response.content);
            randomProduct = data[Math.floor(Math.random() * data.length)];

            context.cart.push(randomProduct.id);

            done();
        });
    });

    it("should successfully remove a product from cart based on its id", function(done) {
        cart = context.cart;
        expect(cart).to.exist;
        expect(cart).to.be.instanceof(Array);
        expect(cart.length).to.equal(1);
        for (var property in cart[0]) {
            expect(cart[0][property]).to.equal(randomProduct[property]);
        }

        removeFromCart(randomProduct.id, function(error) {
            expect(error).to.be.undefined;
            expect(context.cart).to.exist;
            expect(context.cart.length).to.equal(0);

            done();
        })
    });

    it("should fail to remove a product from cart if the product is not found on it", function(done) {
        context.cart.length = 0;

        removeFromCart(randomProduct.id, function(error) {
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal("product with id " + randomProduct.id + " not found in the cart");

            done();
        })
    });

    it("should fail to remove a product from cart if the product does not exist based on its id", function(done) {
        randomProduct.id = Math.random();

        removeFromCart(randomProduct.id, function(error) {
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal("product with id " + randomProduct.id + " does not exist");

            done();
        })
    });

    it("should fail to remove a product from cart if the first parameter is not a number", function() {
        randomProduct.id = "some string";
        expect(function() { removeFromCart(randomProduct.id, function() {}) }).to.throw(TypeError, randomProduct.id + " is not a number");

        randomProduct.id = undefined;
        expect(function() { removeFromCart(randomProduct.id, function() {}) }).to.throw(TypeError, randomProduct.id + " is not a number");

        randomProduct.id = [];
        expect(function() { removeFromCart(randomProduct.id, function() {}) }).to.throw(TypeError, randomProduct.id + " is not a number");

        randomProduct.id = {};
        expect(function() { removeFromCart(randomProduct.id, function() {}) }).to.throw(TypeError, randomProduct.id + " is not a number");
    });

    it("should fail to remove a product from cart if the second parameter is not a function", function() {
        randomProduct.id = Math.random();

        var callback = "some string"
        expect(function() { removeFromCart(randomProduct.id, callback) }).to.throw(TypeError, callback + " is not a function");

        callback = undefined;
        expect(function() { removeFromCart(randomProduct.id, callback) }).to.throw(TypeError, callback + " is not a function");

        callback = [];
        expect(function() { removeFromCart(randomProduct.id, callback) }).to.throw(TypeError, callback + " is not a function");

        callback = {};
        expect(function() { removeFromCart(randomProduct.id, callback) }).to.throw(TypeError, callback + " is not a function");
    });

    after(function() {
        context.cart.length = 0;
    })
}.bind(context));