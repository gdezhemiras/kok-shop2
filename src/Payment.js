import { React, useEffect, useState } from 'react'
import './css/Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct.js'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer.js'
import axios from './axios'
import { db } from './firebase.js'

// *************************** MAIN FUNCTION ***********************************
function Payment() {
	const [{ basket, user }, dispatch] = useStateValue()

	// Used For Payment Methods Eg. Card Details, Verify Card Number, Handle Payment, etc.
	// www.stripe.com
	const stripe = useStripe()
	const elements = useElements()

	// Link History
	const history = useHistory()

	// Payment Success Flag
	const [succeeded, setSucceeded] = useState(false)

	// Payment Processing Flag
	const [processing, setProcessing] = useState('')

	// Handle Errors and Disable Submit Button in the Payment Method (Stripe)
	const [error, setError] = useState(null)
	const [disabled, setDisabled] = useState(true)

	// Client Secret Code for making the transaction via Stripe
	const [clientSecret, setClientSecret] = useState(true)

	useEffect(() => {
		// generate the special stripe secret which allows us to charge a customer
		// Gets Updated every time an item is added/deleted b'coz the transaction amount changes as well
		const getClientSecret = async () => {
			// GET And POST Request from Stripe
			// response will have the "response" recieved from Stripe
			const response = await axios({
				method: 'post',
				// Stripe expects the total in a currencies Subunits (paisa)
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			})
			setClientSecret(response.data.clientSecret)
		}

		getClientSecret()
	}, [basket])

	console.log('THE SECRET IS >>>', clientSecret)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setProcessing(true)

		// A promise request to Stripe and the repsonse is "awaited"
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment confirmation

				// Updating: Users-> "Manush"-> Orders -> New Order with PaymentIntentID
				db.collection('users')
					.doc(user?.uid)
					.collection('orders')
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					})

				// If the paymentIntent is positive:
				setSucceeded(true)
				setError(null) //No errors
				setProcessing(false) //Processing done

				// Empty the basket after successful payment
				dispatch({
					type: 'EMPTY_BASKET',
				})

				history.replace('/orders')
			})
	}

	const handleChange = (e) => {
		// Listen for changes in the Card Element
		// and display any errors as the customer types their card details
		setDisabled(e.empty)
		setError(e.error ? e.error.message : '')
	}
	return (
		<div className='payment'>
			<div className='payment__container'>
				{/* Payment Section - Title */}
				<h1>Checkout {<Link to='/checkout'>({basket?.length} items)</Link>}</h1>
				{/* Payment Section - Delivery Address */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment__address'>
						<p>{user?.email}</p>
						<p>Abay Pravda</p>
						<p>KZ, ALA</p>
					</div>
				</div>
				{/* Payment Section - Review Items */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Review Items and Delivery</h3>
					</div>
					<div className='payment__items'>
						{basket.map((items) => (
							<CheckoutProduct
								id={items.id}
								title={items.title}
								image={items.image}
								price={items.price}
								rating={items.rating}
							/>
						))}
					</div>
				</div>
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Payment Method</h3>
					</div>
					{/* Payment Section - Payment Methods */}
					<div className='payment__details'>
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className='payment__priceContainer'>
								<CurrencyFormat
									renderText={(value) => (
										<div>
											<h3>Order Total: {value}</h3>
										</div>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'₸'}
								/>
								{/* Disable the Button if the current event is Processing/Succeeded/Disabled For other reasons */}
								<button disabled={processing || disabled || succeeded}>
									{/* Show Processing if the current state is processing */}
									<span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
								</button>
							</div>

							{/* Errors */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payment
