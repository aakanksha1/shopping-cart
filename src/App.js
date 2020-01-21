import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import "./components/ProductCard.css";
import "./components/ShoppingCart.css";
import "./components/ProductList.css";
import "./components/Sizes.css";
import "./App.css";
import ShoppingCart from './components/ShoppingCart';
import CartProvider from './components/CartProvider';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

//firebase imports
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { CardBody, CardText } from 'react-bootstrap/Card';

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

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Message = ({ user }) => (
  <React.Fragment>{user ? <Welcome user={user} /> : <SignIn />}</React.Fragment>
);

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const Welcome = ({ user }) => (
  <Container>
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Card.Text className="text">
              Welcome to Shopping Cart, {user.displayName}
            </Card.Text>
            <Button className="logout" primary onClick={() => firebase.auth().signOut()}>
              Log out
    </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

const App = () => {
  const [data, setData] = useState({});
  const [inventory, setInventory] = useState({});
  const [user, setUser] = useState(null);


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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <CartProvider>
      <ShoppingCart inventory={inventory} setInventory={setInventory} />
      <ul>
        <Message user={user} />
        <ProductList products={products} inventory={inventory}
          setInventory={setInventory} />
      </ul>
    </CartProvider>
  );
};

export default App;
export { dbLink };