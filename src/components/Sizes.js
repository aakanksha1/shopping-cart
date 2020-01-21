import React from "react";
import { ButtonGroup, Button } from 'react-bootstrap';

const sizes = ({ state }) => {
	const { product, cart, setCart, inventory, setInventory } = state;
	const iterate = product.sku;

	const addToCart = size => {
		const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		setCart([...cart, { ...product, size, id }]);

		// updating inventory 
		const updatedInventory = Object.assign({}, inventory);
		updatedInventory[product.sku][size]--;
		setInventory(updatedInventory);
	}

	if (Object.keys(inventory).length === 0) {
		return null;
	}

	return (
		<div className='inventory'>
			{Object.values(inventory[iterate]).every(val => val === 0) ? (
				<p>Out of Stock</p>) : null}
			<ButtonGroup className="button-group">
				{inventory[iterate]["S"] !== 0 ? (
					<Button className="button" variant="secondary" onClick={() => addToCart("S")}>S</Button>) : null}
				{inventory[iterate]["S"] !== 0 ? (
					<Button className="button" variant="secondary" onClick={() => addToCart("M")}>M</Button>) : null}
				{inventory[iterate]["S"] !== 0 ? (
					<Button className="button" variant="secondary" onClick={() => addToCart("L")}>L</Button>) : null}
				{inventory[iterate]["S"] !== 0 ? (
					<Button className="button" variant="secondary" onClick={() => addToCart("XL")}>XL</Button>) : null}
			</ButtonGroup>
		</div>
	);
};


export default sizes;