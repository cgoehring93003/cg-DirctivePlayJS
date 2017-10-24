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
		//getById: getById,
    addAddress: addAddress, 
		deleteAddress: deleteAddress,

    getAddresses: getAddresses,
    getAddress: getAddress,   
    getCount: getCount,      
    next: next,
    previous: previous,
		runTests: runTests,
		updateAddress: updateAddress	
	}
	
	function getAddresses() {
		 /*var def = $q.defer();
		 def.resolve(xdata);
		 return def.promise; */
     console.log(JSON.stringify(xdata));

     return xdata;
	}
	
	//TODO: fix
  // Once deletes are made, you can't sequentially move through records with this method.
	function getAddress(therecno) {
		console.log('getAddress: therecno: ' + therecno);  

    var itemref = _.findWhere(xdata, {recno: therecno});

    if(itemref) {

      return itemref;
    } else {

      var xitemref = _.findWhere(xdata, {recno: therecno - 0});

      if(xitemref) {
        return xitemref;
      }

    }

	}

	function next(therecno) {
		if(therecno < _.max(xdata, function(stooge){ return stooge.recno }).recno) 
			return getAddress(++therecno);

	}

	function previous(therecno) {
		if(therecno > -1) 
			return getAddress(--therecno);

	}

  function deleteAddress(therecno) {

    xdata = _.without(xdata, _.findWhere(xdata, {recno: therecno}));

  } 
	
  function runTests() {
    angular.forEach(xdata, function(value, key) {
      console.log("value: " + JSON.stringify(value));
    });

    console.log('themax: ' +  _.max(xdata, function(stooge){ return stooge.recno }).recno);
  }

  function addAddress(address) {
    console.log('addAddress: address: ' + JSON.stringify(address));  

    if(address.recno <= 0)
      address.recno = _.max(xdata, function(stooge){ return stooge.recno }).recno;


    xdata.push(address);
  }

  function updateAddress(address) {
    console.log('updateAddress: address: ' + JSON.stringify(address));  

    if(address.recno <= 0)
      address.recno = _.max(xdata, function(stooge){ return stooge.recno }).recno + 1;

    var itemref = _.findWhere(xdata, {recno: address.recno});

    if(itemref) {

      itemref.firstName = address.firstName;
      itemref.lastname = address.lastname;
      itemref.address = address.address;   
      itemref.city = address.city;  
      itemref.state = address.state;
      itemref.zip = address.zip;
    } else {
      xdata.push(address);
    }

  }
  
  function getCount() {
    return xdata.length;
  } 

});