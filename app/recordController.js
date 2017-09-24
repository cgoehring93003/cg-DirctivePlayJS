
// This controller is used for managing record in the edit template.

(function () {
  'use strict';

  myApp.controller('recordController', recordController);

  recordController.$inject = ['$state', '$scope', 'record', 'addressService', 'RecordModel'];

  /* @ngInject */
  function recordController($state, $scope, record, addressService, RecordModel) {
    /* jshint validthis: true */
    var vm = this;

		console.log('recordController start');

		vm.record = record;

		console.log('recordController vm.record: ' + JSON.stringify(vm.record));

		// Need $scope here for listen
	  $scope.$on('previous', listenForPrevious)
	  $scope.$on('newRecord', listenForNewRecord)
	  $scope.$on('save', listenForSave)
	  $scope.$on('delete', listenForDeleteRecord)
	  $scope.$on('next', listenForNext)
	  $scope.$on('runTests', listenForTest)


	  function listenForPrevious($event, message){

			console.log('listenForPrevious: message: <<<<<<<---------- ' + message);

	    vm.previous('previous');
	  }

	  function listenForNewRecord($event, message){

			console.log('listenForNewRecord: message: <<<<<<<---------- ' + message);

	    vm.newRecord('newRecord');
	  }

	  function listenForSave($event, message){

			console.log('listenForSave: message: <<<<<<<---------- ' + message);

	    vm.save('save');
	  }

	  function listenForDeleteRecord($event, message){

			console.log('listenForDeleteRecord: message: <<<<<<<---------- ' + message);

	    vm.deleteRecord('deleteRecord');
	  }

	  function listenForNext($event, message){

			console.log('listenForNext: message: <<<<<<<---------- ' + message);

	    vm.next('next');
	  }

	  function listenForTest($event, message){

			console.log('listenForTest: message: <<<<<<<---------- ' + message);

	    vm.runTests('runTests');
	  }

		vm.addressService = addressService;	
		vm.recordCount = vm.addressService.getCount();	
				
		/*
		if(vm.record) {
			;
		} else {
			vm.record =  {
				"recno": 5,
				"firstName" : "Nick",
				"lastName" : "Nolte",	
				"address" : "1020 Hollywood Blvd.",
				"city" : "Beverly Hills",
				"state" : "CA",	vm.record = 
				"zip" : "90210"
			  };
		}
*/
		vm.runTests = function() {
      console.log('recordController: runTests:');			
			addressService.runTests();

		}	

		vm.deleteRecord = function() {
      console.log('recordController: deleteRecord:');					
			addressService.deleteRecord()
		}

		vm.previous = function(formObjectIsValid) {
      console.log('recordController: previous:');
			console.log('recordController: ' + JSON.stringify(vm.record));

			// here is where you would post to back-end
			vm.record = vm.addressService.previous(vm.record.recno);			
    }

		vm.newRecord = function(formObjectIsValid) {
      console.log('recordController: newRecord:');
			console.log('recordController: ' + JSON.stringify(vm.record));

			// here is where you would post to back-end

			//if (dirty)
			//	vm.save();
			vm.record = new RecordModel();

    }

		vm.save = function(formObjectIsValid) {
      console.log('recordController: save:');
			console.log('recordController: ' + JSON.stringify(vm.record));

			// here is where you would post to back-end

			vm.addressService.updateAddress(vm.record);	
					
    }

		vm.deleteRecord = function(formObjectIsValid) {
      console.log('recordController: deleteRecord:');
			console.log('recordController: ' + JSON.stringify(vm.record));

			// here is where you would post to back-end
			vm.addressService.deleteAddress(vm.record.recno);

			// Just replace current record with new, unsaved record.
			vm.newRecord();

    }

		vm.next = function(formObjectIsValid) {
      console.log('recordController: next:');
			console.log('recordController: ' + JSON.stringify(vm.record));

			// here is where you would post to back-end

			vm.record = vm.addressService.next(vm.record.recno);

    }    

	}
})();



 

	/*

	
	vm.load = function() {
		vm.record = xdata[vm.recno];	
	}	
	
	vm.loadRecord = function() {
		vm.recno = xdata[vm.recno];	
	}		

	vm.save = function() {
		var recordto = vm.blankObject();
		
		angular.copy(vm.record, recordto);

		//addressService.(

	}	
	
	vm.editRecord = function(id) {
		vm.recno = id;
		vm.load();
	}	
	
	vm.deleteRecord = function() {
		
		vm.load();
	}
	
	vm.previous = function() {
		if(vm.recno > 0) 
			vm.recno--;
		
		vm.load();
	}
	
	vm.next = function() {
		if(vm.recno < xdata.length - 1) 			
			vm.recno++;
		
		vm.load();
	}

	vm.newRecord = function() {
		xdata.push(vm.blankObject);
		
		vm.recno = xdata.length;
		vm.load();
	}		
	
	vm.blankObject = function() {
		return  {
			"firstName" : "",
			"lastName" : "",	
			"address" : "",
			"city" : "",
			"state" : "",	
			"zip" : ""
		  };
	
	}		
		*/
