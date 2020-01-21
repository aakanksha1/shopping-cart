import React, { useContext } from "react";
import { Navbar, Nav, Dropdown, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from './CartProvider';
import { dbLink } from "../App";

const ShoppingCart = ({ inventory, setInventory }) => {

	const { cart, setCart } = useContext(
		CartContext
	);

	const deleteItem = product => {
		const emptyingCart = cart.filter(shoppingItem => product.id !== shoppingItem.id);
		setCart(emptyingCart);


		// inventory

		const updatedInventory = Object.assign({}, inventory);
		updatedInventory[product.sku][product.size]++;
		setInventory(updatedInventory);
	}

	const CheckoutItem = ({ product }) => {
		return (
			<ListGroupItem className="card-container">
				<FontAwesomeIcon icon={faTimes}
					onClick={() => deleteItem(product)}
				/>
				<img src={`data/products/${product.sku}_2.jpg`} alt="" />
				<p>{product.title}</p>
				<p>Price: ${product.price}</p>
				<p>Size:{product.size}</p>
			</ListGroupItem>
		)
	}

	const readyCheckout = () => {
		dbLink.ref().set(inventory);
		// Empty ShoppingCart
		setCart([]);
		alert("Successfully Bought!");
	};

	// const calculateSubtotal = () => {
	// 	cart.reduce((a,b) => a + b.price, 0)
	// };

	const Checkout = () => {
		// const total = calculateSubtotal();
		return cart.length >= 1 ? (
			<div className='checkout'>
				<span className="subtotal">Subtotal: ${cart.reduce((a, b) => a + b.price, 0)}</span>
				<br></br>
				<Button size="lg"variant="success" className='checkout-button' onClick={readyCheckout}>Checkout</Button>
			</div>
		) : null;
	}

	return (
		<Navbar bg="dark" variant="dark" className="navigation-bar" sticky="top" >
			<Navbar.Brand href="#home" className="home">
				Shopping Cart
    </Navbar.Brand>
			<Nav className="ml-auto">
				<Dropdown className="dropdown">
					<Dropdown.Toggle variant="success" size="lg">
						<FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
						&nbsp; Shopping Cart
 					 </Dropdown.Toggle>
					<Dropdown.Menu className="dropdown-menu">
						{cart.map(product => (
							<ListGroup>
								<CheckoutItem className='checkout-item' product={product}
									inventory={inventory}
									setInventory={setInventory}
									
								/>
								<br></br>
							</ListGroup>
						))}
						<Checkout cart={cart} />
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	)
}

export default ShoppingCart;