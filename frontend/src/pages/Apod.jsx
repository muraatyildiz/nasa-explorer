import React, { useEffect, useState } from 'react';
import {
  Card, CardMedia, CardContent, Typography,
  CircularProgress, Container, Box
} from '@mui/material';
import axios from 'axios';

const Apod = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://nasa-explorer-cmp4.onrender.com/api/nasa/apod')
      .then(response => {
        setApod(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching APOD:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Astronomy Picture of the Day
      </Typography>

      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          image={apod.url}
          alt={apod.title}
          sx={{
            height: { xs: 240, sm: 400 },
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {apod.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {apod.explanation}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Apod;
