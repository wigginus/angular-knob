angular.module('ui.knob', [])
.directive('knob', function () {
	return {
		restrict: 'EACM',
		template: function(elem, attrs){
			return '<input value="{{ knob }}">';
		},
		replace: true,
		scope: {
			release : '&knobRelease',
			change : '&knobChange',
			data : '=knobData',
			options : '=knobOptions'
		},
		link: function (scope, elem, attrs) {

			if (!angular.isUndefined(scope.change)) {
				scope.options.change = function() {
					updateModel();
					scope.$eval(scope.change);
				}
			}

			if (!angular.isUndefined(scope.release)) {
				scope.options.release = function() {
					updateModel();
					scope.$eval(scope.release);
				}
			}

			function updateModel() {
				setTimeout(function () {
					scope.$apply(function() {
						var currData = angular.element(elem).val();
						scope.data.val = parseInt(currData,10);
					});
				}, 0);

			};

			elem.knob(scope.options);
			elem.val(scope.data.val).change();
		}
	};
});
