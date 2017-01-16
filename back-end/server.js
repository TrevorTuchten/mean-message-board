const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const moment = require('moment');

const auth = require('./controllers/auth');
const message = require('./controllers/message');
const checkAuthenticated = require('./services/checkAuthenticated');
const cors = require('./services/cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors);

// Requests
app.get('/api/message', message.get);

app.post('/api/message', checkAuthenticated, message.post);

app.post('/auth/register', auth.register);

app.post('/auth/login', auth.login);

// Connection
mongoose.connect("mongodb://localhost:27017/test", (err, db) => {
	if (!err) {
		console.log('we are connected to mongo'); //TODO: Remove Me!!
	}
})

let server = app.listen(5000, () => {
	console.log('listening on port', server.address().port); //TODO: Remove Me!!
})
