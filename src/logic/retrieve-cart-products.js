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
        
        let itemsInCart = localStorage.getItem('cart')

        if(itemsInCart) (itemsInCart = JSON.parse(itemsInCart))
        else itemsInCart = []

        itemsInCart = data.filter(({ id }) => itemsInCart.indexOf(id) !== -1)
        
        return itemsInCart
    })();
}