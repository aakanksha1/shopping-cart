import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import "./components/ProductCard.css";
import "./components/ShoppingCart.css"
import ShoppingCart from './components/ShoppingCart';
import CartProvider from './components/CartProvider';

//firebase imports
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIwPV04lHIlEvvRTbPG2qyYHaDX5PVVaY",
  authDomain: "shopping-cart-115ea.firebaseapp.com",
  databaseURL: "https://shopping-cart-115ea.firebaseio.com",
  projectId: "shopping-cart-115ea",
  storageBucket: "shopping-cart-115ea.appspot.com",
  messagingSenderId: "588027615299",
  appId: "1:588027615299:web:9f468a892be3d072135cf6",
  measurementId: "G-C4WSZN926W"
}

firebase.initializeApp(firebaseConfig);
const dbLink = firebase.database();
const db = dbLink.ref();

console.log('db', db);

const App = () => {
  const [data, setData] = useState({});
  const [inventory, setInventory] = useState({});

  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/data/products.json");
      const json = await response.json();
      setData(json);
    };

    fetchProducts();

  const getInventory = snap => {
    if (snap.val()) setInventory(snap.val());
  };
  db.on("value", getInventory, error => alert(error));
  return () => {
    db.off("value", getInventory);
  };
}, []);

  return (
    <CartProvider>
      <ShoppingCart inventory={inventory} setInventory={setInventory} />
      <ul>
        <ProductList products={products} inventory={inventory}
          setInventory={setInventory} />
      </ul>
    </CartProvider>
  );
};

export default App;
export { dbLink };