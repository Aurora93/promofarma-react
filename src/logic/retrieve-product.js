const fetch = require('node-fetch') 

/**
 * Gets a target product from the database
 * 
 * @param {string} productId product's unique id
 *
 * @returns {function} it returns the product
 */

module.exports = function(productId) {
    //if (!(productId instanceof Number)) throw new TypeError(`${productId} is not a number`)

    return (async() => {
        const response = await fetch("data/data.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        const data = await response.json()

        const product = data.find(({ id }) => id === productId)

        if (!product) return new Error(`product with id ${productId} does not exist`)
        
        return product
    })();
}