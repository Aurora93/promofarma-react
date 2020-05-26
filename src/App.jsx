import React, { useState, useEffect } from 'react';
import  { ProductList, CartList, Feedback } from './components'
import { addToCart, removeFromCart, retrieveAllProducts, retrieveCartProducts } from './logic'

function App(){
    const [items, setItems] = useState(null);
    const [itemsInCart, setItemsInCart] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        retrieveAllProducts()
            .then(products => {
                return setItems(products)
            })
            .then(() => {
                return retrieveCartProducts()
            })
            .then((productsInCart) => {
                return setItemsInCart(productsInCart)
            })
            .then(() => {})
    }, [])

    async function onAddtoCartHandler (id) {
        try {
            await addToCart(id)

        } catch({ message }) {
            setError(message)
        }
    }

    async function onRemoveFromCartHandler (id) {
        try {
            removeFromCart(id)

        } catch({ message }) {
            setError(message)
        }
    }

  return(<>
    <main className="main">
        {error && <Feedback message={error}/>}
        {!error && <ProductList items={items} onAddToCart={onAddtoCartHandler} />}
        {!error && <CartList items={itemsInCart} onRemoveFromCart={onRemoveFromCartHandler} />}
    </main>
  </>)
}

export default App