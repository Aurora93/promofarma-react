import React, { useState, useEffect } from 'react';

function ProductItem({ item: { id, name, price }, onAddToCart }){
    const [checked, setChecked] = useState(undefined)
    const [cart, setCart ] = useState([])

    useEffect(() => {
        let cart = localStorage.getItem('cart')

        if(cart) {
            cart = JSON.parse(cart)
            setCart(cart)
        }else{
            cart=[]
        } 
    }, [localStorage.getItem('cart', cart)])

    function onAddToCartHandler (event) {
        event.preventDefault()
        setChecked(id)

        onAddToCart(id)
    }

    return (<>
        <li className="product-item">
            <p className="product-item__name">{name}</p>
            <p className={`product-item__price${cart.includes(id) ? '--disabled' : ''}`}>{price} €</p>
            <img 
                src={"/icons/add-to-cart.png"} 
                alt="" 
                className={`product-item__add-to-cart${cart.includes(id) ? '--disabled' : ''}`} onClick={onAddToCartHandler}
            />
        </li>
    </>)
}
export default ProductItem