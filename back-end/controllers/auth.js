const User = require('../models/user');
const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = {
	register: (req, res) => {
		console.log('req.body', req.body); //TODO: Remove Me!!

		User.findOne({
			email: req.body.email
		}, (err, existingUser) => {

			if (existingUser) {
				return res.status(409).send({
					message: 'Email is already registered'
				});
			}

			let user = new User(req.body);

			user.save((err, result) => {
				if (err) {
					res.status(500).send({
						message: err.message
					});
				}
				res.status(200).send({
					token: createToken(result)
				});
			})

		});
	}
}

function createToken(user) {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	};
	return jwt.encode(payload, 'secret');
}
