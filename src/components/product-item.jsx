import React, { useState, useEffect } from 'react';

function ProductItem({ item: { id, name, price }, onAddToCart }){
    const [checked, setChecked] = useState(undefined)
    const [itemsInCart, setItemsInCart ] = useState([])

    useEffect(() => {
        let itemsInCart = localStorage.getItem('cart')

        if(itemsInCart) {
            (itemsInCart = JSON.parse(itemsInCart))
            setItemsInCart(itemsInCart)
        } else itemsInCart = []
    }, [localStorage.getItem('cart', itemsInCart)])

    function onAddToCartHandler (event) {
        event.preventDefault()
        setChecked(id)

        onAddToCart(id)
    }

    return (<>
        <li className="product-item">
            <p className="product-item__name">{name}</p>
            <p className={`product-item__price${itemsInCart.includes(id) ? '--disabled' : ''}`}>{price} €</p>
            <img 
                src={"/icons/add-to-cart.png"} 
                alt="" 
                className={`product-item__add-to-cart${itemsInCart.includes(id) ? '--disabled' : ''}`} onClick={onAddToCartHandler}
            />
        </li>
    </>)
}
export default ProductItem