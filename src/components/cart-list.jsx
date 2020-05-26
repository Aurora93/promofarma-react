import React, { useContext, useEffect, useState } from 'react';
import CartItem from './cart-item'
import { Context } from './context-provider'
import { withRouter } from 'react-router-dom'
import {retrieveCartProducts} from '../logic'

export default withRouter(function ({ onRemoveFromCart }) {
    const [state, setState] = useContext(Context)
    const [itemsInCart, setItemsInCart] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        retrieveCartProducts()
        .then(products => {
            setItemsInCart(products)
            setQuantity(products.length)
            setTotal(products.reduce((accum, { price }) => accum += price, 0))
        })
    }, [state])

    return (<>
        <section className="cart-list">
            <div className="cart-list__container">
            <p className="cart-list__header">MI CESTA</p>
                <div className="cart-list__bar"></div>
                <div className="cart-list__product-list--hidden">
                <ul className="cart-list__list">
                    {itemsInCart.map(item => <CartItem key={item.id} item={item} onRemoveFromCart={onRemoveFromCart}/>)}
                </ul>
                </div>
                <div className="cart-list__total">
                    <div className="cart-list__quantity">
                        <p className="cart-list__text">TOTAL</p>
                        <p className="cart-list__amount">({quantity} {`${quantity === 1 ? 'producto' : 'productos'}`})</p>
                    </div>
                    <span className="cart-list__total-price">{total.toFixed(2)} €</span>
                </div>
            </div>
        </section>
    </>)
})