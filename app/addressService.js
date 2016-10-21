var xdata =
[
  {
	"recno": 1,
    "firstName" : "Billy Bob",
    "lastName" : "Thorton",	
    "address" : "1000 Hollywood Blvd.",
    "city" : "Beverly Hills",
    "state" : "CA",	
    "zip" : "90210"
  },
  
  {
	"recno": 2,	  
    "firstName" : "Kim",
    "lastName" : "Kardashian",	
    "address" : "1001 Hollywood Blvd.",
    "city" : "Beverly Hills",
    "state" : "CA",	
    "zip" : "90210"
  },  
  {
	"recno": 3,	  
    "firstName" : "Steve",
    "lastName" : "Martin",	
    "address" : "1010 Hollywood Blvd.",
    "city" : "Beverly Hills",
    "state" : "CA",	
    "zip" : "90210"
  }, 
  {
	"recno": 4,	  
    "firstName" : "Tom",
    "lastName" : "Hanks",	
    "address" : "1011 Hollywood Blvd.",
    "city" : "Beverly Hills",
    "state" : "CA",	
    "zip" : "90210"
  },  
  {
	"recno": 5,
	"firstName" : "Nick",
    "lastName" : "Nolte",	
    "address" : "1020 Hollywood Blvd.",
    "city" : "Beverly Hills",
    "state" : "CA",	
    "zip" : "90210"
  },  
  {
	"recno": 6,
	"firstName" : "Carry",
    "lastName" : "Grant",	
    "address" : "1030 Hollywood Blvd.",
    "city" : "Beverly Hills",
    "state" : "CA",	
    "zip" : "90210"
  }
  
];


myApp.factory('addressService', function ($timeout, $q) {


	return {
		getById: getById,
		getAddresses: getAddresses,
		getAddress: getAddress,
		getCount: getCount		
	}

	function getById(id) {
		for(var i = 0; i < xdata.length; i++) {
			if(id === xdata[i].recno) {
				record = xdata[i]
				return record;
			}
				
		}
		return;
	};	  
	
	function getCount() {
		return xdata.length;
	}  
	
	function getAddresses() {
		 var def = $q.defer();
		 def.resolve(xdata);
		 return def.promise;
	}
	
	
	function getAddress(id) {
		console.log('getAddress: id: ' + id);  
		var def = $q.defer();

		$timeout(function() {
			def.resolve(_.findWhere(xdata, {recno: id * 1}))  // * for casting
		}, 0)// set to 1000 to watch the resolve wait a sec before setting the first state
		
		return def.promise;
	}

});