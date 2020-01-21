import ProductCard from "./ProductCard";
import React from "react";
import { Row, Col, Container } from 'react-bootstrap';


const ProductList = ({ products, inventory, setInventory }) => {
	return (
		<Container>
			<Row className="product-list">
				{products.map(product => (
					<Col xs={12} sm={12} md={4} lg={4}>
						<ProductCard product={product}
							inventory={inventory}
							setInventory={setInventory} />
					</Col>
				))}
			</Row>
		</Container>
	);

};

export default ProductList;