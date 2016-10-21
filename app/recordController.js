
// This controller is used for managing record in the edit template.

function recordController(recordx, recordid){
	var vm = this;	

	vm.recordCount = 0; 			
	
	vm.record = recordx;
	vm.recno = recordx.recno;	
	vm.recno2 = recordid;
	
	
	vm.load = function() {
		vm.record = xdata[vm.recno];	
	};	
	
	vm.loadRecord = function() {
		vm.recno = xdata[vm.recno];	
	};		

	
	if(recordx) {
		vm.record = recordx;
		vm.recno = vm.record.recno;		

	} else {
		vm.record =  {
			"recno": 5,
			"firstName" : "Nick",
			"lastName" : "Nolte",	
			"address" : "1020 Hollywood Blvd.",
			"city" : "Beverly Hills",
			"state" : "CA",	
			"zip" : "90210"
		  }
		vm.recno = vm.record.recno;		
	}


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
		
}
	
myApp.controller('recordController', recordController);

 



	
	