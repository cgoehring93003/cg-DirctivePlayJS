
	function formController($state, $stateParams, $location, addressService){
		var vm = this;	
		
		vm.addressService = addressService;
		vm.recordCount = 0; 			
		vm.recno = 0;	
		vm.record = {};		
		
		
		vm.getCount = function() {
			vm.recordCount = vm.addressService.getCount();
		};			
		
	/*
		vm.showparm = function() {
			console.log('showparm called');
		};	
	
		vm.save = function() {
			
			vm.load();
		};		
		
		vm.editRecord = function(id) {
			vm.recno = id;
			vm.load();
		};	
		
		vm.deleteRecord = function() {
			
			vm.load();
		};			
		vm.previous = function() {
			if(vm.recno > 0) 
				vm.recno--;
			
			vm.load();
		};
		
		vm.next = function() {
			if(vm.recno < xdata.length - 1) 			
				vm.recno++;
			
			vm.load();
		};
	
		
		
		
		vm.newRecord = function() {
			xdata.push(vm.blankObject);
			
			vm.recno = xdata.length;
			vm.load();
		};		
		
		vm.blankObject = function() {
			return  {
				"firstName" : "",
				"lastName" : "",	
				"address" : "",
				"city" : "",
				"state" : "",	
				"zip" : ""
			  };
		
		};		
		
		vm.load = function() {
			vm.record = xdata[vm.recno];	
		};	
		
		vm.loadRecord = function() {
			vm.recno = xdata[vm.recno];	
		};		
		vm.getAddress = function(id) {
			vm.recno =id;
			addressService.getAddress(id).then(
				function successCallback(response) {
					console.log('success');
					vm.record = response;
					vm.load();
				}, function errorCallback(response) {
					console.log('load failed');
				});			

			return; 
		};		
		
		
		vm.getById = function(id) {
			for(var i = 0; i < xdata.length; i++) {
				if(id === xdata[i].recno) {
					vm.record = xdata[i]
					return vm.record;
				}
					
			}
			return;
		};		
		
		vm.loadById = function(id) {
			for(var i = 0; i < xdata.length; i++) {
				if(i === xdata[i].recno) {
					
					vm.record = xdata[i];
					return;
				}
					
			}
			return;
		};
		*/
		vm.getCount();
		
		//vm.record = xdata[0];	
		
    }
//'rnStepper', 
//   myApp.controller('formController', ['$state', '$stateParams', '$location', 'record', 'addressService', formController]);

   myApp.controller('formController', formController);

 



	
	