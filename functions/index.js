const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
	'sk_test_51KPgG7SCHwpFXNnPFQgJHPL2UXsYPXxA8QTI6fKEzEzsHWAuRRFjWzo8yb8EKh8NpzT96dwscgKgY2zafKMEdGdV001ds9As4M'
)

// API

// - App Config
const app = express()

// - Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
	const total = request.query.total

	console.log('Payment Request Receieved BOOM!! got this amount >>', total)
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // subUnits of Currency
		currency: 'inr',
	})

	// Status 201: OK and something is Created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	})
})

// - Listen command
exports.api = functions.https.onRequest(app)

// Example endpoint
// http://localhost:5001/easy-buy-b6550/us-central1/api
