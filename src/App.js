import { useEffect } from 'react'
import { auth } from './firebase'
import './css/App.css'
import Header from './Header.js'
import Home from './Home.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login.js'
import Checkout from './Checkout.js'
import Payment from './Payment.js'
import Orders from './Orders.js'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(
	'pk_test_51KPgG7SCHwpFXNnP1pXETBIY9SLkGJj4CDiWtw1dyYugpOF55ARUaXcZS5SEBShleI71y4Xy1p8ESh1bCY9caBaE00V59EaLSC'
)

function App() {
	const [{}, dispatch] = useStateValue()

	useEffect(() => {
		// will only run once when the app component laods...
		// eg. Whenever the user logs in/out on the website
		auth.onAuthStateChanged((authUser) => {
			console.log('THE USER IS >>> ', authUser)

			if (authUser) {
				// The user just logged in / the user was logged in

				dispatch({
					type: 'SET_USER',
					user: authUser,
				})
			} else {
				//  The user is logged out
				dispatch({
					type: 'SET_USER',
					user: null,
				})
			}
		})
	}, [])
	return (
		<Router>
			<div className='app'>
				<Switch>
					<Route exact path='/'>
						<Header />
						<Home />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route path='/payment'>
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path='/orders'>
						<Header />
						<Orders />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
