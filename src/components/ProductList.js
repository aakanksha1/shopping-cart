import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';


const ProductList = ({ products }) => {
	return (
		<Container>
			<Row className = "product-list">
				{products.map(product => (
					<Col xs={12} sm={12} md={4} lg={4}>
						<ProductCard key={product.sku} product={product} />
					</Col>
				))}
			</Row>
		</Container>
	);

};

export default ProductList;