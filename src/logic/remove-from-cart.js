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
    if ((typeof productId==!'number')) throw new TypeError(`${productId} is not a number`)

    return (async() => {
        const response = await fetch("data/data.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        const data = await response.json()

        let itemsInCart = localStorage.getItem('cart')

        if(itemsInCart) (itemsInCart = JSON.parse(itemsInCart))
        else itemsInCart = []

        const product = data.find(({ id }) => id === productId )
        if (!product) return new Error(`product with id ${productId} does not exist`)

        const productInCart = itemsInCart.find(id => id === productId )
        if (!productInCart) return new Error(`product with id ${productId} is not in the cart`)
        
        itemsInCart.splice(itemsInCart.findIndex(id => id === productId), 1)
        localStorage.setItem('cart', JSON.stringify(itemsInCart))
    })()
}