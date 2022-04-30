import React, { createContext, useContext, useReducer } from 'react'

// Data Layer ==> A layer in react in which every change is pushed from a component and can be pulled to as many components as we want.
// For Example: Pushing from the Add to Basket button and reflecting it in the shopping cart, checkout page, product card, and many other places.
// Can be called as Redux

// Prepares the Data Layer
export const StateContext = createContext()

// Wrap our app and provide the Data Layer
export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
)
// Pull information from the data layer
export const useStateValue = () => useContext(StateContext)
