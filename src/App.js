import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";

import { Products, Navbar } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  //load cart data from commerce.js
  const fetchCart = async () => {
    setCart(commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("ulala", cart);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
