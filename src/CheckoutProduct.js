import React from 'react'
import './css/CheckoutProduct.css'
import { useStateValue } from './StateProvider.js'

function CheckoutProduct({ id, image, title, price, rating, hidebutton }) {
	const [{ basket }, dispatch] = useStateValue()
	const removefrombasket = () => {
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id,
		})
	}
	return (
		<div className='checkoutProduct'>
			<img className='checkoutProduct__image' src={image} />
			<div className='checkoutProduct__info'>
				<p className='checkoutProduct__title'> {title}</p>
				<p className='checkoutProduct__price'>
					<small>₹</small>
					<strong>{price}</strong>
				</p>
				<div className='checkoutProduct__rating'>
					{Array(rating)
						.fill()
						.map(() => (
							<p>⭐</p>
						))}
				</div>
				<br />
				{/* !hidebutton --> Removes the hide button on the Orders Page */}
				{!hidebutton && (
					<button onClick={removefrombasket}>Remove from Cart</button>
				)}
			</div>
		</div>
	)
}

export default CheckoutProduct
