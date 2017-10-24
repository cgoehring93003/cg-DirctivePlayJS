
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
		//vm.recno = recno;

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



    vm.deleteRecordConfirmed = function()
    {
    	vm.deleteRecord(vm.recno);

    }

	}
})();
