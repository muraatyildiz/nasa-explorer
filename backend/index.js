const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const nasaRoutes = require('./routes/nasa');
const aiRoutes = require('./routes/ai');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use('/api/nasa', nasaRoutes);
app.use('/api/ai', aiRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

