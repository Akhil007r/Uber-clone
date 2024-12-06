const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(express.json());
app.use('/users', userRoutes)
module.exports = app;
