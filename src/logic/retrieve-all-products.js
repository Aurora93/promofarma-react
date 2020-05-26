const fetch = require('node-fetch') 

/**
 * Gets all the products from the database
 *
 * @returns {function} it returns an array of all products of the database
 */

module.exports = function () {
    return (async()=> {

    
        const response = await fetch("data/data.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        const allProducts = await response.json()
        
        return allProducts
    })()
}