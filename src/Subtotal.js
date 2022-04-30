import React from 'react'
import { useHistory } from 'react-router-dom'
import './css/Subtotal.css'
import { useStateValue } from './StateProvider.js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer.js'

function Subtotal() {
	const history = useHistory()
	const [{ basket }, dispatch] = useStateValue()
	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={(value) => (
					<div>
						<p>
							Subtotal ({basket?.length} items): <strong>{` ${value}`}</strong>
						</p>
						<small className='subtotal__gift'>
							<input type='checkbox' /> This order contains a gift
						</small>
					</div>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={'text'}
				thousandSeperator={true}
				prefix={'₸'}
			/>
			{/* history.push : Use - Redirects the user to the payment page..
			Similar to Link Tag.. Simply replaces the 'payment' to the current link*/}
			<button onClick={(e) => history.push('/payment')}>
				Proceed to Checkout
			</button>
		</div>
	)
}

export default Subtotal
