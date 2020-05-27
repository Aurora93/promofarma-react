const { expect } = require('chai')
const retrieveCartProducts = require('./retrieve-cart-products')
const context = require('./context')

describe("retrieveCartProducts", function() {
    var randomProduct;

    it("should succeed on retrieving the products from the cart, which are bound to the context", async () => {
        let results = await retrieveCartProducts() 
        expect(results).to.be.defined();
        expect(results).to.be.instanceof(Array);
        expect(results.length).to.equal(0);
    });

    it("should retrieve an array of the products that has previously been added to the cart", async () => {
        const response = await fetch("data/data.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        const data = await response.json()

        randomProduct = data[Math.floor(Math.random() * data.length)];

        context.cart.push(randomProduct.id);
            
        let results = await retrieveCartProducts()
        expect(results).to.be.instanceof(Array);
        expect(results.length).to.equal(1);

        for(var property in results[0]) {
            expect(results[0][property]).to.equal(randomProduct[property]);
        }      
          
    });
})