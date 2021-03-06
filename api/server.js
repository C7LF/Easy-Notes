const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require("passport");
const mongoose = require('mongoose');

require('dotenv').config()

// create express app
const app = express();

app.use(cors()) // app is your express object

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');

const users = require("./routes/user.route");

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Notes API v1"});
});

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.use('/user', passport.authenticate('jwt', {session: false}), users);

// Passport middleware
app.use(passport.initialize());

// Require Notes routes
require('./routes/note.routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});