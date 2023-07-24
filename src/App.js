import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = '/dummyData.json'; // Change the URL to match your file location

const Product = ({ product, addToCart }) => {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

const CartItem = ({ item }) => {
  return (
    <div>
      <h3>{item.title}</h3>
      <p>Price: ${item.price}</p>
    </div>
  );
};

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data); // Check the fetched data in the console
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  

  const addToCart = (product) => {
    console.log('Adding to cart:', product); // Check the added product in the console
    setCartItems([...cartItems, product]);
  };
  

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default App;
