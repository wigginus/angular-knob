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

			function updateModel() {
				setTimeout(function () {
					scope.$apply(function() {
						var currData = angular.element(elem).val();
						scope.data.val = parseInt(currData,10);
						scope.data.changed = true;
					});
				}, 0);
			};

			if (!angular.isUndefined(scope.change)) {
				scope.options.change = function() {
					updateModel();
					scope.$eval(scope.change);
				}
			}

			if (!angular.isUndefined(scope.release)) {
				scope.options.release = function() {
					if (scope.data.init) {
						updateModel();
						scope.$eval(scope.release);
					} else {
						scope.data.init = true;
					}
				}
			}			

			var knobDiv = elem.knob(scope.options);
			knobDiv.append('<div class="knobLogo" style="background-image:'+scope.options.imgUrl+'"></div>');
			elem.val(scope.data.val).change();
		}
	};
});
