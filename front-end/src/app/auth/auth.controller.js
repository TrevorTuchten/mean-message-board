export class AuthController {

	constructor($auth) {
		'ngInject';

		this.$auth = $auth;
	}

	register() {
		const vm = this;
		this.$auth.signup(this.user)
			.then((token) => {
				vm.$auth.setToken(token);
			});
	}

	login() {
		const vm = this;
		this.$auth.login(this.login.user)
			.then((token) => {
				vm.$auth.setToken(token);
			});
	}

}
