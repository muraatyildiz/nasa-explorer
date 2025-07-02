const express = require('express');
const cors = require('cors');
const nasaRoutes = require('./routes/nasa');
const aiRoutes = require('./routes/ai');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/nasa', nasaRoutes);
app.use('/api/ai', aiRoutes);


app.get('/ping', (req, res) => res.send('pong'));


app.use(errorHandler);

module.exports = app;
