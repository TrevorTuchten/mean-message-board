const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

let Message = mongoose.model('Message', {
	msg: String
});

app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})

GetMessages = (req, res) => {
	Message.find({}).exec((err, result) => {
		res.send(result);
	})
}

app.get('/api/message', GetMessages);

app.post('/api/message', (req, res) => {
	console.log(req.body); //TODO: Remove Me!!

	let message = new Message(req.body);
	message.save();

	res.status(200);
})

mongoose.connect("mongodb://localhost:27017/test", (err, db) => {
	if (!err) {
		console.log('we are connected to mongo'); //TODO: Remove Me!!
	}
})

let server = app.listen(5000, () => {
	console.log('listening on port', server.address().port); //TODO: Remove Me!!
})
