import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import DateSelector from "../components/DateSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarsPhotos, setDate } from "../store/slices/marsSlice";
import MarsPhotoCard from "../components/MarsPhotosCard";

const Mars = () => {
  const dispatch = useDispatch();
  const { date, photos, loading } = useSelector((state) => state.mars);

  useEffect(() => {
    dispatch(fetchMarsPhotos(date));
  }, [date, dispatch]);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Mars Rover Photos
        </Typography>
        <DateSelector
          label="Select Date"
          value={new Date(date)}
          onChange={(newDate) => dispatch(setDate(newDate))}
        />
      </Box>

      {loading ? (
        <Box textAlign="center" mt={8}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {photos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <MarsPhotoCard photo={photo} />
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
