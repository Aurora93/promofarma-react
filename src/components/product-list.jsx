import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './product-item'
import { Context } from './context-provider'
import { withRouter } from 'react-router-dom'
import { retrieveAllProducts } from '../logic'

export default withRouter(function ({ onAddToCart }){
    const [state, setState] = useContext(Context)
    const [items, setItems] = useState([])

    useEffect(() => {
        retrieveAllProducts()
        .then((products) => {
            setItems(products)
        })

    }, [state])

    return (<>
        <section className="product-list">
            <div className="product-list__">
                <ul className="product-list__list">
                    {items.map(item => <ProductItem key={item.id} item={item} onAddToCart={onAddToCart} />)}
                </ul>
            </div>
        </section>
    </>)
})