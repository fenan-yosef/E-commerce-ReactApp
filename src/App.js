import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    total_items: 0,
    line_items: [],
  });
  const { order, setOrder } = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // const handleAddToCart = async (productId, quantity) => {
  //   const cart = await commerce.cart.add(productId, quantity);
  //   setCart({
  //     total_items: cart.total_items + 1,
  //     line_items: [...cart.line_items, cart],
  //   });
  // };
  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await commerce.cart.add(productId, quantity);

      // Log the response to debug its structure
      console.log("Response from commerce.cart.add:", response);

      // Ensure the response contains the cart data directly
      if (response && response.id) {
        setCart(response);
      } else {
        console.error("Cart data not found in the response:", response);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (CheckoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        CheckoutTokenId,
        newOrder
      );
      console.log("Incoming order", incomingOrder);

      setOrder(incomingOrder);
      console.log("==============", order);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
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
    fetchProducts();
    fetchCart();
  }, []);

  console.log("ulalaga", cart);
  console.log(cart.line_items);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleUpdateCartQty={handleUpdateCartQty}
              />
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
