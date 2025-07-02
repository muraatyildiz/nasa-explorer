import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h3" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" mb={4}>
        We couldn't load this page. It might be a bad link, network issue, or API error.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Back to APOD
      </Button>
    </Container>
  );
};

export default ErrorPage;
