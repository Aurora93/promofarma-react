import React, { useEffect, useContext, useState } from 'react';
import  { ProductList, CartList, Feedback, Context } from './components'
import { addToCart, removeFromCart, retrieveAllProducts, retrieveCartProducts } from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const [state, setState] = useContext(Context)
    const [items, setItems] = useState([]);
    // const [itemsInCart, setItemsInCart] = useState();
    // const [error, setError] = useState()

    useEffect(() => {
        render()
    }, [])

    function render() {
        (async() => {
            const products = await retrieveAllProducts()
            setState({ ...state, items: products })
            setItems(products)

            const productsInCart = await retrieveCartProducts()
            setState({ ...state, itemsInCart: productsInCart })
            
            setState({ ...state });
            history.push('/home');
        })()
    }

    async function onAddtoCartHandler (id) {
        try {
            await addToCart(id)

        } catch({ message }) {
            setState({...state, error: message})
        }
    }

    async function onRemoveFromCartHandler (id) {
        try {
            removeFromCart(id)

        } catch({ message }) {
            setState({...state, error: message})
        }
    }
    const { error, itemsInCart } = state

    return(<>
        <main className="main">
            {error && <Feedback message={error}/>}
            <Route path="/home" render={() => <ProductList items={items} onAddToCart={onAddtoCartHandler} />} />
            <Route path="/home" render={() => <CartList items={itemsInCart} onRemoveFromCart={onRemoveFromCartHandler} />} />
            {/* // {error && <Feedback message={error}/>}
            // {!error && <ProductList items={items} onAddToCart={onAddtoCartHandler} />}
            // {!error && <CartList items={itemsInCart} onRemoveFromCart={onRemoveFromCartHandler} />} */}
        </main>
    </>)
})