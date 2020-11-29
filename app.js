const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const port = process.env.PORT || 3000;
const logger = require('./logger');
const mongoose = require('mongoose');
const allRoutes = require('./app/routes/app-routes');
const path = require('path');

const app = express();

// Setting View Engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Setting path for static files
app.use(express.static(path.join(__dirname + '/public')));
// db.url
// Database connection
mongoose.connect(config.get('db.url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => logger.info(`Database successfully connected`))
    .catch((err) => logger.error(`Database connection failed!! ${err}`))

// Defining all Routes
app.use('/', allRoutes);
app.get('/test', (req, res) => {
    res.render('update.ejs');
})
// Server is on: http://localhost:3000
app.listen(port, () => logger.info(`Server is on Port: ${port}`));