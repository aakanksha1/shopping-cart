import React, { useContext } from "react";
import { Navbar, Nav, Dropdown, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CartContext } from './CartProvider';

const ShoppingCart = () => {

	const { cart, setCart } = useContext(
		CartContext
	);

	return (
		<Navbar bg="dark" variant="dark" className="navigation-bar">
			<Navbar.Brand href="#home">
				Shopping Cart
    </Navbar.Brand>
			<Nav className="ml-auto">
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic">
						Shopping Cart
 					 </Dropdown.Toggle>
					<Dropdown.Menu>
						<hr />
						{cart.map(product => (
							<ListGroup>
								<ListGroupItem className="card-container">
									<img src={`data/products/${product.sku}_2.jpg`} alt="" />
									<p>{product.title}</p>
									<p>{`$${product.price}`}</p>
									<p>Size: {product.size}</p>
								</ListGroupItem>
							</ListGroup>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	)
}

export default ShoppingCart;