import React, { useEffect, useContext, useState } from 'react';
import  { ProductList, CartList, Feedback, Context } from './components'
import { addToCart, removeFromCart, retrieveAllProducts, retrieveCartProducts } from './logic'
import { Route, withRouter } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const [state, setState] = useContext(Context)

    useEffect(() => {
        localStorage.clear()
        render()
    }, [])

    function render() {
        (async() => {
            const products = await retrieveAllProducts()
            setState({ ...state, items: products })
            // setItems(products)

            const productsInCart = await retrieveCartProducts()
            setState({ ...state, itemsInCart: productsInCart })

            history.push('/home');
        })()
    }

    async function onAddtoCartHandler (id) {
        try {
            await addToCart(id)

            const productsInCart = await retrieveCartProducts()
            setState({ ...state, itemsInCart: productsInCart })
        } catch({ message }) {
            setState({...state, error: message})
        }
    }

    async function onRemoveFromCartHandler (id) {
        try {
            
            await removeFromCart(id)
            const productsInCart = await retrieveCartProducts()
            
            setState({ ...state, itemsInCart: productsInCart })
        } catch({ message }) {
            setState({...state, error: message})
        }
    }
    const { error, itemsInCart, items } = state

    return(<>
        <main className="main">
            {error && <Feedback message={error}/>}
            <Route path="/home" render={() => <ProductList items={items} onAddToCart={onAddtoCartHandler} />} />
            <Route path="/home" render={() => <CartList items={itemsInCart} onRemoveFromCart={onRemoveFromCartHandler} />} />
        </main>
    </>)
})