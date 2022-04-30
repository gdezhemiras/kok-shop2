import React from 'react'
import './css/Home.css'
import coverpic from './Resources/EasyBuyHome.jpg'
import Product from './Product.js'
function Home() {
	return (
		<div className='home'>
			<div className='home__container'>
				<img className='home__image' src={coverpic} alt='Cover Photo' />

				<div className='home__row'>
					<Product
						id='128'
						title="Bond LH015 Mini D Handle Shovel"
						image='https://m.media-amazon.com/images/I/81OBOfUWZ-L._AC_SL1500_.jpg'
						price={7999}
						rating={5}
					/>
					<Product
						id='129'
						title='NERUB Watering Can 1 Gallon for Indoor Plants'
						image='https://m.media-amazon.com/images/I/519gvQ8hl0S._AC_SL1200_.jpg'
						price={1250}
						rating={5}
					/>
				</div>

				<div className='home__row'>
					<Product
						id='130'
						title="Scotts Turf Builder Lawn Food"
						image='https://m.media-amazon.com/images/I/71E2Vh5KrOL._AC_SL1500_.jpg'
						price={590}
						rating={4}


					/>
					<Product
						id='131'
						title='Gardzen Large Leaf Scoop'
						image='https://m.media-amazon.com/images/I/810FLmwhWhL._AC_SL1500_.jpg'
						price={2600}
						rating={3}
					/>
					<Product
						id='132'
						title='STARROAD-TIM 39.3 x 31.5  '
						image='https://m.media-amazon.com/images/I/71sGOBFy0XL._AC_SL1500_.jpg'
						price={1300}
						rating={5}
					/>
				</div>

				<div className='home__row'>
					<Product
						id='135'
						title="Mini Farming Book  "
						image='https://m.media-amazon.com/images/P/B004ULMJ2C.01._SCLZZZZZZZ_SX500_.jpg'
						price={1000}
						rating={4}
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
