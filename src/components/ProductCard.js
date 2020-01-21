import React, { useContext } from "react";
import { Container, Card } from 'react-bootstrap';
import Sizes from './Sizes';
import { CartContext } from './CartProvider';

const ProductCard = ({ product, inventory, setInventory }) => {
	const { cart, setCart } = useContext(CartContext);

	return (
		<Container>
			<Card border="secondary" className="product-card">
				<Card.Img variant="top"
					src={"data/products/".concat(product.sku, "_1.jpg")} />
				<Card.Body>
					<Card.Text>
						<p className="title">{product.title}</p>
						<hr className="line"></hr>
						<p className="description"
							style={{ display: product.description ? 'block' : 'none' }}
						><span>Description:</span> {product.description}</p>
						<p className="price"><span>Price:</span> {product.currencyFormat.concat(product.price)} </p>
						<p className="sizes">Sizes:</p>
						<Sizes
							state={{ product, cart, setCart, inventory, setInventory }} />
					</Card.Text>
				</Card.Body>
			</Card>
			<br></br>
		</Container>
	)
}
export default ProductCard;
