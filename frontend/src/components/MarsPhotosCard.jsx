import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const MarsPhotoCard = ({ photo }) => {
  return (
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
  );
};

export default MarsPhotoCard;
