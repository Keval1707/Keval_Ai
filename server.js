// app.js or server.js
const express = require('express');
const dotenv = require('dotenv');
const i18n = require('i18n');
const ejs = require('ejs'); 
const path =require('path')
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/seed', express.static(path.join(__dirname, 'src', 'seed')));
app.set('view engine', 'ejs');
app.set('views', './src/views');

const router = require('./src/routes/router');
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
