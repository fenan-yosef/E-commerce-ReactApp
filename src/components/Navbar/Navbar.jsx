import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";

import { ShoppingCart } from "@material-ui/icons";

const Navbar = () => {
  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="inherit"
      ></AppBar>
    </>
  );
};

export default Navbar;
