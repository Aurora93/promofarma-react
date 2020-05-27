const { expect } = require('chai')
const retrieveAllProducts = require('retrieve-all-products')

describe("retrieveAllProducts", function() {
    it("should succeed to retrieve all products in the database and return them through a callback", async() => {
        let results = await retrieveAllProducts()
        expect(results).to.be.instanceof(Array);

        results.forEach(function(element, index) {
            expect(element.name).to.equal(results[index].name);
            expect(element.price).to.equal(results[index].price);
            expect(element.id).to.equal(results[index].id);
            expect(element.image).to.equal(results[index].image);
        });  
    });
})