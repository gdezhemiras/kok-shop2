import React, { useState } from 'react'
import './css/Product.css'
import { useStateValue } from './StateProvider'

function Product({ id, title, image, price, rating }) {
	const [state, dispatch] = useStateValue()
	const [bought, setBought] = useState(false)

	const addToBasket = () => {
		setBought(true)
		//dispatcth the item into the data layer
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		})
		console.log('This is the basket now >>> ', state.basket)
		// console.log('First: ', state.basket)
	}

	return (
		<div className='product'>
			<div className='product__info'>
				<p className='product__title'>{title}</p>
				<p className='product__price'>
					<small>₸</small>
					<strong>{price}</strong>
				</p>
				<div className='product__rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>⭐</p>
						))}
				</div>
			</div>
			<img src={image} alt='product-image'></img>
			<button onClick={addToBasket}>Add to Cart</button>
		</div>
	)
}

export default Product
