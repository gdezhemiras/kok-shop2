import axios from 'axios'

const instance = axios.create({
	// Create an object
	// BaseURL: API hitting URL (here, for payment)
	baseURL: 'http://localhost:5001/kok-shop-b6550/us-central1/api', // THE API (cloud function) URL
})

export default instance
