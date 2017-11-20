// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB setup
// internally this creates a new db called auth
mongoose.connect('mongodb://localhost:auth/auth');

// App setup (middleware)
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // parse incoming requests to json
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
