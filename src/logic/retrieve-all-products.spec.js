const { expect } = require('chai')

describe("retrieveAllProducts", function() {
    it("should succeed to retrieve all products in the database and return them through a callback", function(done) {
        retrieveAllProducts(function(results) {
            expect(results).to.exist;
            expect(results).to.be.instanceof(Array);
            
            (function(callback) {
                var xobj = new XMLHttpRequest();

                xobj.overrideMimeType("application/json");
                xobj.open('GET', '../../public/data/data.json', true); 

                xobj.onreadystatechange = function () {
                    if (xobj.readyState == 4 && xobj.status == "200") {
                        callback(xobj.responseText);
                    }
                };

                xobj.addEventListener('error', function() {
                    callback(new Error('Network error'));
                });

                xobj.send(null);  
            })(function(response) {
                var rawData = JSON.parse(response);
                expect(rawData.length).to.equal(results.length);

                rawData.forEach(function(element, index) {
                    expect(element.name).to.equal(results[index].name);
                    expect(element.price).to.equal(results[index].price);
                    expect(element.id).to.equal(results[index].id);
                    expect(element.image).to.equal(results[index].image);
                });

                done();
            });
        });
    });

    it("should fail to retrieve the products if the return parameter is not a function", function() {
        var callback = "some string";
        expect(function() { retrieveAllProducts(callback) }).to.throw(TypeError, callback + " is not a function");

        callback = undefined;
        expect(function() { retrieveAllProducts(callback) }).to.throw(TypeError, callback + " is not a function");

        callback = Math.random();
        expect(function() { retrieveAllProducts(callback) }).to.throw(TypeError, callback + " is not a function");

        callback = null;
        expect(function() { retrieveAllProducts(callback) }).to.throw(TypeError, callback + " is not a function");

        callback = [];
        expect(function() { retrieveAllProducts(callback) }).to.throw(TypeError, callback + " is not a function");

        callback = {};
        expect(function() { retrieveAllProducts(callback) }).to.throw(TypeError, callback + " is not a function");
    });
})