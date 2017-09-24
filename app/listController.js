

// This controller is for loading the list of records to the grid.


(function () {
    'use strict';

    myApp.controller('listController', listController);

    listController.$inject = ['$state', 'list', 'addressService'];

    /* @ngInject */
    function listController($state, list, addressService) {
      /* jshint validthis: true */
      var vm = this;

			console.log('listController start');		
			
			vm.list = list;
			
			vm.getIt = function(val) {
				console.log('getIt: ' + val);
				console.log('getit: list: ' + JSON.stringify(list));
			}

			vm.goToLink = function(record) {
				console.log('goToLink: record: ' + JSON.stringify(record));

/*
				$state.go('edit', {
			    recno: star.recno //selectedItem and id is defined
				}); */

				$state.go('edit', record);

			}
	
    }
})();



 



	
	