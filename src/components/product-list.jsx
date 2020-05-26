import React from 'react'
import ProductItem from './product-item'

function ProductList({items, onAddToCart}){
    return (<>
        <section className="product-list">
            <div className="product-list__">
                <ul className="product-list__list">
                    {items.map(item => <ProductItem key={item.id} item={item} onAddToCart={onAddToCart} />)}
                </ul>
            </div>
        </section>
    </>)
}

export default ProductList