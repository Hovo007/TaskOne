const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api/auth', authRoutes);

module.exports = app
