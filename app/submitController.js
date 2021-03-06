

// This controller is for loading the list of records to the grid.


(function () {
    'use strict';

    myApp.controller('submitController', submitController);

    submitController.$inject = ['$state', '$rootScope', 'addressService'];

    /* @ngInject */
    function submitController($state, $rootScope, addressService) {
      /* jshint validthis: true */
      var vm = this;

      console.log('submitController start');    

      vm.previous=previous;
      vm.newRecord=newRecord;
      vm.save=save;
      vm.deleteRecord=deleteRecord;
      vm.next=next;

      vm.runTests=runTests;

      function previous(formObjectIsValid) {
        console.log('submitController: ------>>>>>> previous:');

        $rootScope.$broadcast('previous', 'previous');
      }

      function newRecord(formObjectIsValid) {
        console.log('submitController: ------>>>>>> newRecord:');

        $rootScope.$broadcast('newRecord', 'newRecord');
      }

      function save(formObjectIsValid) {
        console.log('submitController: ------>>>>>> save:');

        $rootScope.$broadcast('save', 'save');
      }

      function deleteRecord(formObjectIsValid) {
        console.log('submitController: ------>>>>>> deleteRecord:');

        $rootScope.$broadcast('deleteRecord', 'deleteRecord');
      }   

      function next(formObjectIsValid) {
        console.log('submitController: ------>>>>>> next:');

        $rootScope.$broadcast('next', 'next');
      }

      function runTests(formObjectIsValid) {
        console.log('submitController: ------>>>>>> runTests:');

        $rootScope.$broadcast('runTests', 'runTests');
      }

 
    }
})();

