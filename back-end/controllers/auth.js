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
	},
	login: (req, res) => {

		User.findOne({
			email: req.body.email
		}, (err, user) => {

			if (!user) {
				return res.status(401).send({
					message: 'Email or Password is Invalid'
				});
			}

			if (req.body.pwd == user.pwd) {
				console.log('req.body, user.pwd', req.body, user.pwd); //TODO: Remove Me!!
				res.send({
					token: createToken(user)
				});
			} else {
				return res.status(401).send({
					message: 'Invalid email and/or password'
				});
			}
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
