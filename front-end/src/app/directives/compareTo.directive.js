export function CompareToDirective($parse) {
	'ngInject'
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ngModel) {
			const mainModel = $parse(attrs.compareTo);
			const secondModel = $parse(attrs.ngModel);

			scope.$watch(attrs.ngModel, (newValue) => {
				ngModel.$setValidity(attrs.name, newValue === mainModel(scope));
			});

			scope.$watch(attrs.compareTo, (newValue) => {
				ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
			});
		}
	}
}
