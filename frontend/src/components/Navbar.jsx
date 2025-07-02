import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            color="primary"
            textAlign="left"
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              "&:hover": {
                color: "inherit",
                textDecoration: "none",
              },
            }}
          >
            NASA Explorer
          </Typography>

          <Box sx={{ display: { sm: "block" } }}>
            <Button color="inherit" component={RouterLink} to="/">
              APOD
            </Button>
            <Button color="inherit" component={RouterLink} to="/mars">
              Mars Photos
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
