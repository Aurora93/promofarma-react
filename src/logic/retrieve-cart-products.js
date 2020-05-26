const context = require('./context');
const fetch = require('node-fetch') 

/**
 * Get all the products from the cart
 * 
 * @returns {Array} array of the cart products
 *
 */

module.exports = function() {
    return (async() => {
        const response = await fetch("data/data.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        const data = await response.json()

        const itemsInCart = data.filter(({ id }) => context.cart.indexOf(id) !== -1)
        
        return itemsInCart
    })();
}