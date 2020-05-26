const { expect } = require('chai')

describe("retrieveCartProducts", function() {
    var randomProduct;

    it("should succeed on retrieving the products from the cart, which are bound to the context", function(done) {
        retrieveCartProducts(function(results) {
            expect(results).to.exist;
            expect(results).to.be.instanceof(Array);
            expect(results.length).to.equal(0);

            done();
        });
    });

    it("should retrieve an array of the products that has previously been added to the cart", function(done) {
        call("../../public/data/data.json", undefined, function(error, response) {
            var data = JSON.parse(response.content);
            
            randomProduct = data[Math.floor(Math.random() * data.length)];

            context.cart.push(randomProduct.id);
            
            retrieveCartProducts(function(results) {
                expect(results).to.exist;
                expect(results).to.be.instanceof(Array);
                expect(results.length).to.equal(1);


                for(var property in results[0]) {
                    expect(results[0][property]).to.equal(randomProduct[property]);
                }
    
                done();
            });
        });
    });
}.bind(context));