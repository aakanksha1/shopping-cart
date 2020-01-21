import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import "./components/ProductCard.css";
import ShoppingCart from './components/ShoppingCart';
import CartProvider from './components/CartProvider';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <CartProvider>
      <ShoppingCart />
      <ul>
        <ProductList products={products} />
      </ul>
    </CartProvider>
  );
};

export default App;




/* apiKey: "AIzaSyBWLqTgBXT3M5S9jGoQIeA_O2WoErYYODQ",
    authDomain: "shopping-cart-30c63.firebaseapp.com",
    databaseURL: "https://shopping-cart-30c63.firebaseio.com",
    projectId: "shopping-cart-30c63",
    storageBucket: "shopping-cart-30c63.appspot.com",
    messagingSenderId: "1046058618378",
    appId: "1:1046058618378:web:f90e48fcf4b94ef9da99f3",
    measurementId: "G-B33TCMHN8E" */