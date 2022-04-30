import React, { useState, useEffect } from 'react'
import { db } from './firebase.js'
import './css/Orders.css'
import { useStateValue } from './StateProvider.js'
import Order from './Order.js'

function Orders() {
	const [{ basket, user }, dispatch] = useStateValue()
	const [orders, setOrders] = useState([])

	useEffect(() => {
		// Track to Users-> User("manush shah")-> Orders -> Sort by 'created in descending order
		// Then https://firebase.google.com/docs/firestore/query-data/listen Using Snapshot to save the data on local cache, and update it whenever necessary
		if (user) {
			db.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.orderBy('created', 'desc')
				.onSnapshot((snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				})
		} else {
			setOrders([])
		}
	}, [user])
	return (
		<div className='orders'>
			<h1>Your Orders</h1>

			<div className='orders__order'>
				{orders?.map((order, index) => (
					<div>
						<Order order={order} index={index} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Orders
