import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

const Mars = () => {
  const [date, setDate] = useState(new Date("2015-06-03"));
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async (formattedDate) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/nasa/mars-photos?date=${formattedDate}`
      );
      setPhotos(response.data.photos);
    } catch (error) {
      console.error("Error fetching Mars photos:", error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(format(date, "yyyy-MM-dd"));
  }, [date]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Mars Rover Photos
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ mb: 4 }} />}
        />
      </LocalizationProvider>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {photos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  image={photo.img_src}
                  alt={photo.camera.full_name}
                  sx={{ objectFit: "cover", height: 250 }}
                />
                <CardContent>
                  <Typography variant="body2">
                    {photo.rover.name} – {photo.camera.full_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {photos.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 4, textAlign: "center", width: "100%" }}
            >
              No photos found for selected date.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Mars;
