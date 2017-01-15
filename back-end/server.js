const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;

const app = express();

let database;

app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})

app.post('/api/message', (req, res) => {
	console.log(req.body); //TODO: Remove Me!!
	database.collection('messages').insertOne(req.body);

	res.status(200);
})

mongo.connect("mongodb://localhost:27017/test", (err, db) => {
	if (!err) {
		console.log('we are connected to mongo'); //TODO: Remove Me!!
		database = db;
	}
})

let server = app.listen(5000, () => {
	console.log('listening on port', server.address().port); //TODO: Remove Me!!
})
