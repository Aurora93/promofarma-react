import React, { useState, useEffect } from 'react';
import CartItem from './cart-item'

function CartList({ results, addItem, onRemoveFromCart }) {
    const [quantity, setQuantity] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setQuantity(results.length)
    }, [results.length])

    useEffect(() => {
        const totalPrice = results.reduce((accum, { price }) => accum += price, 0)
        setTotal(totalPrice)
    }, [results])

    return (<>
        <section className="cart-list">
            <div className="cart-list__container">
            <p className="cart-list__header">MI CESTA</p>
                <div className="cart-list__bar"></div>
                <div className="cart__product-list--hidden">
                <ul className="cart-list__list">
                    {results.map(item => <CartItem key={item.id} item={item} onRemoveFromCart={onRemoveFromCart}/>)}
                </ul>
                </div>
                <div className="cart__total">
                    <div className="cart__quantity">
                        <p className="cart__text">TOTAL</p>
                        <p className="cart__amount">{quantity}</p>
                    </div>
                    <span className="cart__total-price">{total.toFixed(2)} €</span>
                </div>
            </div>
        </section>
    </>)
}

export default CartList