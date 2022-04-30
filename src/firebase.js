import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAkF0hePpjHl5OJmsBtmhEt8c2aXOnGPYc',
	authDomain: 'easy-buy-b6550.firebaseapp.com',
	projectId: 'easy-buy-b6550',
	storageBucket: 'easy-buy-b6550.appspot.com',
	messagingSenderId: '512621710687',
	appId: '1:512621710687:web:347d6ef487014ff8a53aea',
	measurementId: 'G-73XQS7S9Z1',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
