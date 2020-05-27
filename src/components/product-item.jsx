import React, { useState } from 'react';

function ProductItem({ item: { id, name, price }, onAddToCart }){
    const [checked, setChecked] = useState(undefined)

    function onAddToCartHandler (event) {
        event.preventDefault()
        setChecked(id)

        onAddToCart(id)
    }

    return (<>
        <li className="product-item">
            <p className="product-item__name">{name}</p>
            <p className={`product-item__price${checked === id ? '--disabled' : ''}`}>{price} €</p>
            <img 
                src={"/icons/add-to-cart.png"} 
                alt="" 
                className={`product-item__add-to-cart${checked === id ? '--disabled' : ''}`} onClick={onAddToCartHandler}
            />
        </li>
    </>)
}
export default ProductItem