const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const nasaRoutes = require('./routes/nasa');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use('/api/nasa', nasaRoutes);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

