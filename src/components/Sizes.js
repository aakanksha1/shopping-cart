import React from "react";
import { ButtonGroup, Button } from 'react-bootstrap';

const sizes = ({ state }) => {
    const { product, cart, setCart } = state;

    const addToCart = size => {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setCart([...cart, { ...product, size, id }]);
    };

    return (
        <ButtonGroup className="button-group" variant="dark">
            <Button onClick={() => addToCart("S")}>S</Button>
            <Button onClick={() => addToCart("M")}>M</Button>
            <Button onClick={() => addToCart("L")}>L</Button>
            <Button onClick={() => addToCart("XL")}>XL</Button>
        </ButtonGroup>
    );
};

export default sizes;