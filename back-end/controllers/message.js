const Message = require('../models/message');

module.exports = {
	get: (req, res) => {
		Message.find({}).populate('user', '-pwd').exec((err, result) => {
			res.send(result);
		})
	},
	post: (req, res) => {
		console.log(req.body, req.user); //TODO: Remove Me!!

		req.body.user = req.user;

		let message = new Message(req.body);
		message.save();

		res.status(200);
	}
}
