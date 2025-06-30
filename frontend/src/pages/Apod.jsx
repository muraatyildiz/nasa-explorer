import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Box,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelector } from "react-redux";

const Apod = ({ selectedDate, setSelectedDate }) => {
  const { apod, loading } = useSelector((state) => state.apod);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
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
          Astronomy Picture of the Day
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newDate) => newDate && setSelectedDate(newDate)}
            maxDate={new Date()}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
      </Box>

      {loading || !apod ? (
        <Box textAlign="center" mt={8}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
            {apod.title}
          </Typography>
          <CardMedia
            component="img"
            image={apod.url}
            alt={apod.title}
            sx={{
              height: { xs: 240, sm: 400 },
              objectFit: "cover",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {apod.explanation}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Apod;
