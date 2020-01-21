import React from "react";
import { ButtonGroup, Button } from 'react-bootstrap';

const sizes = ({ state }) => {
    const { product, cart, setCart } = state;

    const addToCart = size => {
        setCart([...cart, { ...product, size }]);
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