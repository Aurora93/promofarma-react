const fetch = require('node-fetch') 

/**
 * Gets all the products from the database
 *
 * @returns {function} it returns an array of all products of the database
 */

module.exports = function () {
    return (async()=> {
        const response = await fetch("../../public/data/data.json")
        const allProducts = await response.json()

        return allProducts
    })()
}