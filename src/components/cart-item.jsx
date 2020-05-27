import React from 'react';

function CartItem({ item: { id, image, name, price }, onRemoveFromCart }) {
    function onRemoveFromCartHandler (event) {
        event.preventDefault()

        onRemoveFromCart(id)
    }

    return (<>
        <li className="cart-item">
            <div className="cart-item__left">
                <img src={`/product-images/${image}`} alt="" className="cart-item__image"/>
                <p className="cart-item__">{name}</p>
            </div>

            <div className="cart-item__price">
                <span className="cart-item__price-v">{price} €</span>
                <button className="cart-item__delete-" onClick={onRemoveFromCartHandler}>Eliminar</button>
            </div>
        </li>
    </>)
}
export default CartItem