const { expect } = require('chai')
const context = require('./context')
const addToCart = require('./add-to-cart')

describe("addToCart", () => {
    var data, randomProductId;

    before(async () =>{
        data = await fetch("../../public/data/data.json")
    });

    it("should succeed on adding an specific product to the cart. When done so, it should disable the product to be added again", async()=> {
        randomProductId = data[Math.floor(Math.random() * data.length)].id;

        await addToCart(randomProductId)
        expect(context.cart).to.be.instanceof(Array);
        expect(context.cart[0]).to.equal(randomProductId);
    });

    it("should fail to add the product to the cart if it has already been added to it", async()=> {
        let error = await addToCart(randomProductId)

        expect(error).to.exist;
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.equal(`product with id ${randomProductId} is already in the cart`);

    });

    it("should fail to add the product to the cart if the product does not exist", async()=> {
        randomProductId = Math.random()

        error = await addToCart(randomProductId)
        expect(error).to.exist;
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.equal`product with id ${randomProductId} does not exist`

    });

    it("should fail to add the product to the cart if the ID passed is not a number", function() {
        randomProductId = "some string";
        expect(function() { addToCart(randomProductId) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = undefined;
        expect(function() { addToCart(randomProductId) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = [];
        expect(function() { addToCart(randomProductId) }).to.throw(TypeError, randomProductId + " is not a number");

        randomProductId = {};
        expect(function() { addToCart(randomProductId) }).to.throw(TypeError, randomProductId + " is not a number");
    });

    after(()=> {
        context.cart.length = 0;
    });
})