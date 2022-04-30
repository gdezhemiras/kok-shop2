import React, { useState } from 'react'
import './css/Header.css'
import logo from './Resources/EasyBuyLogo.png'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'

function Header() {
	const [{ basket, user }, dispatch] = useStateValue()

	const handleAuthentication = () => {
		if (user) {
			auth.signOut()
		}
	}
	return (
		<div className='header'>
			<Link to='/'>
				<img className='header__logo' src={logo} />
			</Link>

			<div className='header__search'>
				<input type='text' className='header__searchInput' />
				<SearchIcon className='header__searchIcon' />
			</div>

			<div className='header__nav'>
				{/* Logic:: When the toggle is on Sign In.. only then move to Login Page */}
				{/* !user => if user is not null
				'/login' => if the path is "login" (Always True)*/}
				<Link to={!user && '/login'}>
					<div className='header__option' onClick={handleAuthentication}>
						<span className='header__optionLineOne'>
							{/* If user != null
									display the text before "@" in the Email-id
								Else display "Guest" */}
							Hello {user ? user.email.split('@')[0] : 'Guest'}
						</span>
						<span className='header__optionLineTwo'>
							{user ? 'Sign Out' : 'Sign In'}
						</span>
					</div>
				</Link>
				<Link to='/orders'>
					<div className='header__option'>
						<span className='header__optionLineOne'>Returns</span>
						<span className='header__optionLineTwo'>&amp; Orders</span>
					</div>
				</Link>
				<div className='header__option'>
					<span className='header__optionLineOne'>Your</span>
					<span className='header__optionLineTwo'>Prime</span>
				</div>
				<Link to='/checkout'>
					<div className='header__optionsBasket'>
						<ShoppingBagIcon />
						<span className='header__optionLineTwo header__basketCount'>
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Header
