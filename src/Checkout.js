import React from 'react'
import './css/Checkout.css'
import Subtotal from './Subtotal.js'
import { useStateValue } from './StateProvider.js'
import CheckoutProduct from './CheckoutProduct.js'

function Checkout() {
	const [{ basket, user }, dispatch] = useStateValue()
	return (
		<div className='checkout'>
			<div className='checkout__left'>
				<div>
					<div>
						<h2>Hello {user ? user.email.split('@')[0] : 'Guest'}!</h2>
						<h2 className='checkout__title'>Your Shopping Cart</h2>
						{basket.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
			</div>
			<div className='checkout__right'>
				<Subtotal />
			</div>
		</div>
	)
}

export default Checkout
