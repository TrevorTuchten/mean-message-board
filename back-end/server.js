const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})

app.post('/api/message', (req, res) => {
	console.log(req.body); //TODO: Remove Me!!
	res.status(200);
})

let server = app.listen(5000, () => {
	console.log('listening on port', server.address().port); //TODO: Remove Me!!
})
