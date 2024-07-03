import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";

import { Products, Navbar, Cart } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    total_items: 0,
    line_items: [],
  });

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  //load cart data from commerce.js
  const fetchCart = async () => {
    try {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("ulalaga", cart);
  console.log(cart.line_items);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default App;
