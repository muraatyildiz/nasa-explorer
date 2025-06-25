import React from "react";
import { AppBar, Toolbar, Typography, Button, Box ,CssBaseline } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="primary" component="nav">
        <Toolbar>
          <Typography textAlign="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NASA Explorer
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
