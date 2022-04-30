export const initialState = {
	basket: [],
	user: null,
}

export const getBasketTotal = (basket) =>
	basket?.reduce((amount, item) => item.price + amount, 0)

// Called every time an action is to be performed to basket
export const reducer = (state, action) => {
	console.log('Action', action)
	switch (action.type) {
		case 'ADD_TO_BASKET':
			return {
				...state, // copy whatever state was there previously
				basket: [...state.basket, action.item], // Add the already present items to the basket using ...state and then add action.item i.e. The newly added item
			}
		case 'REMOVE_FROM_BASKET':
			// Find the index of the item for which the "remove from basket" button is clicked
			// action.id is picked from the web-app and matched with the basket.id
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			)
			// Copying the old basket
			let newBasket = [...state.basket]

			//Updating the basket by removing the selected element
			if (index >= 0) {
				// Removes the element on the index "index"
				// eg. [1,10,23,54], index = 2 => [1,10,54]
				newBasket.splice(index, 1)
			} else {
				console.warn(
					`Can't remove product (id: ${action.id}) as it is not in the basket.`
				)
			}
			// returning the updated basket and the previous state as it is
			return {
				...state,
				basket: newBasket,
			}

		case 'SET_USER':
			return {
				...state,
				user: action.user,
			}

		case 'EMPTY_BASKET':
			return {
				...state,
				basket: [],
			}
			// Return the current state by defualt
			defualt: return state
	}
}
