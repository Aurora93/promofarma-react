const context = require('./context')
const fetch = require('node-fetch') 

/**
 * Removes a product from the cart array
 * 
 * @param {string} productId product's unique id
 * 
 * @returns {function} it returns nothing if it succeed or an Error if the product does not exist or the product is not in the cart
 *
 */

module.exports = function (productId) {
    if (!(productId instanceof Number)) throw new TypeError(`${productId} is not a number`)

    return (async() => {
        const response = await fetch("data/data.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        const data = await response.json()

        const product = data.find(({ id }) => id === productId )
        if (!product) return new Error(`product with id ${productId} does not exist`)
        
        const productInCart = context.cart.find(id => id === productId )
        if (productInCart) return new Error(`product with id ${productId} is already in the cart`)

        context.cart.splice(context.cart.findIndex(id => id === productId), 1)
    })()
}