const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);
app.use(cors());
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running in port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error(err));