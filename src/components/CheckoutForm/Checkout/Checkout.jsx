import React, { useState, useEffect } from "react";

import {
  Paper,
  Stepper,
  Step,
  Typography,
  CircularProgress,
  Divider,
  Button,
  StepLabel,
  CssBaseline,
} from "@material-ui/core";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";
import { useNavigate, Link } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();

  // console.log("==============", order);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        console.log("token", token);
        setcheckoutToken(token);
      } catch (err) {
        if (activeStep !== steps.length) navigate("/");
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep + 1);
  const backStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
    // console.log(">>>>>>>>>>", activeStep);
  };

  let Confirmation = () => (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase,
          {/* {order.customer.firstname}
            {order.customer.lastname} */}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          {/* Order ref: */}
          {/* {order.customer_reference} */}
        </Typography>
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </div>
    </>
  );
  // : (
  //   <div className={classes.spinner}>
  //     <CircularProgress />
  //   </div>
  // );

  if (error) {
    return (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
