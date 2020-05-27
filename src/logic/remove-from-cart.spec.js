const { expect } = require('chai')
const context = require('./context')
const removeFromCart = require('./remove-from-cart')

describe("removeFromCart", function() {
    var data, randomProduct, cart;

    beforeEach(async() => {
        context.cart.length = 0;

        const response = await fetch("data/data.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        data = await response.json()
        randomProduct = data[Math.floor(Math.random() * data.length)];
    });

    it("should successfully remove a product from cart based on its id", async () => {
        cart = context.cart;
        expect(cart).to.be.instanceof(Array);
        expect(cart.length).to.equal(1);
        for (var property in cart[0]) {
            expect(cart[0][property]).to.equal(randomProduct[property]);
        }

        await removeFromCart(randomProduct.id)
        expect(context.cart.length).to.equal(0);

    });

    it("should fail to remove a product from cart if the product is not found on it", async () => {
        context.cart.length = 0;

        let error = await removeFromCart(randomProduct.id)           
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.equal("product with id " + randomProduct.id + " not found in the cart");         
    });

    it("should fail to remove a product from cart if the product does not exist based on its id", async() => {
        randomProduct.id = Math.random();

        let error = removeFromCart(randomProduct.id)
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.equal("product with id " + randomProduct.id + " does not exist");
    });

    it("should fail to remove a product from cart if the first parameter is not a number", function() {
        randomProduct.id = "some string";
        expect(function() { removeFromCart(randomProduct.id)}).to.throw(TypeError, randomProduct.id + " is not a number");

        randomProduct.id = undefined;
        expect(function() { removeFromCart(randomProduct.id)}).to.throw(TypeError, randomProduct.id + " is not a number");

        randomProduct.id = [];
        expect(function() { removeFromCart(randomProduct.id)}).to.throw(TypeError, randomProduct.id + " is not a number");

        randomProduct.id = {};
        expect(function() { removeFromCart(randomProduct.id)}).to.throw(TypeError, randomProduct.id + " is not a number");
    });

    afterAll(function() {
        context.cart.length = 0;
    })
})