const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/api/message', (req, res) => {
	console.log(req.body); //TODO: Remove Me!!
	res.status(200);
})

let server = app.listen(5000, () => {
	console.log('listening on port', server.address().port); //TODO: Remove Me!!
})
