import React from "react";
import useStyles from "./styles";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQty,
}) => {
  const classes = useStyles();
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      No items added. Please add items to cart.
      <Link to="/" className={classes.link}>
        Start Adding Some Item
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          subtotal: {cart.subtotal.formatted_with_symbol}
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </Typography>
      </div>
    </>
  );

  if (!cart.line_items) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
