
myApp.factory('Serv', function($rootScope) {
	var rtn = {
		vals: [1,2,3]
	}

	// simulates service refreshing data, either via socket message or just a timer
	setTimeout(function() {
		$rootScope.$apply(function() {
		   rtn.vals = [4,5,6];
		})
	}, 1000);


	return {
		getVals: function() {
		   return rtn;
		}
	}
});

myApp.controller('mainCtrl', function ($scope, Serv) {
	var vm = this;

	vm.vals = Serv.getVals();

}); // controller
	  
	  
	  
	  