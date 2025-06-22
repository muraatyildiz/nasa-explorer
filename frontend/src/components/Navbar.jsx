import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NASA Explorer
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            APOD
          </Button>
          <Button color="inherit" component={RouterLink} to="/mars">
            Mars Photos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
