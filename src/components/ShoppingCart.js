import React, { useContext } from "react";
import { Navbar, Nav, Dropdown, ListGroup, ListGroupItem } from 'react-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from './CartProvider';

const ShoppingCart = () => {

	const { cart, setCart } = useContext(
		CartContext
	);

	const deleteItem = product => {
		const emptyingCart = cart.filter(shoppingItem => product.id !== shoppingItem.id);
		setCart(emptyingCart);
	}

	const CheckoutItem = ({ product }) => {
		return (
			<ListGroupItem className="card-container">
				<FontAwesomeIcon icon={faTimes} 
					onClick={() => deleteItem(product)}
				/>
				<img src={`data/products/${product.sku}_2.jpg`} alt="" />
				<p>{product.title}</p>
				<p>${product.price}</p>
				<p>Size:{product.size}</p>
			</ListGroupItem>
		)
	}

	return (
		<Navbar bg="dark" variant="dark" className="navigation-bar">
			<Navbar.Brand href="#home">
				Shopping Cart
    </Navbar.Brand>
			<Nav className="ml-auto">
				<Dropdown className="dropdown">
					<Dropdown.Toggle variant="success">
						Shopping Cart
 					 </Dropdown.Toggle>
					<Dropdown.Menu className="dropdown-menu">
						<hr />
						{cart.map(product => (
							<ListGroup>
								<CheckoutItem product = {product}/>
								<br></br>
							</ListGroup>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	)
}

export default ShoppingCart;