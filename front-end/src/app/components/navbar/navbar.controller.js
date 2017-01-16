export class NavbarController {
	constructor($auth) {
		'ngInject';

		this.$auth = $auth;
		this.isAuthenticated = $auth.isAuthenticated;
	}

	// methods
	logout() {
		this.$auth.logout();
	}
}
