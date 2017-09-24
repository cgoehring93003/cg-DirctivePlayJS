

var myApp = angular.module('myApp', ['ui.router', '720kb.tooltips'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
 

	$locationProvider.html5Mode(false);
 
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
			controller: 'recordController as rc',
            templateUrl: 'templates/home.html',
			resolve: {
				records: function ($stateParams, addressService ) {
					return addressService.getAddresses();	     
				}
			}
        })
		.state('edit', {
      url: '/edit/:recno',			
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {

					return addressService.getAddress($stateParams.recno);	   
				   
				}
			}
		})	
		.state('save', {
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {

					return addressService.updateAddress(formData);	   
				   
				}
			}
		})

		.state('deleteRecord', {
            url: '/delete/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/confirmDeleteForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {
					return addressService.getAddress($stateParams.id);	   
				   
				}
			}
		})	

		.state('up', {
            url: '/up/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {
					return addressService.getAddress($stateParams.id + 1);	   
				   
				}
			}
		})
		.state('down', {
            url: '/down/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {
					return addressService.getAddress($stateParams.id - 1);	   
				   
				}
			}
		})		

		.state('all', {
            url: '/all',
			//controller: 'recordListController as rlc',
			controller: 'listController as lc',			
			templateUrl: 'templates/addresses.html',
			resolve: {
				list: function (addressService ) {
				   return addressService.getAddresses();
				}
			}
		})		

		.state('runTests', {
            url: '/tests/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {
					return addressService.getAddress($stateParams.id - 1);	   
				   
				}
			}
		})
		.state('next', {
            url: '/next/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {
					return addressService.getAddress($stateParams.id - 1);	   
				   
				}
			}
		})

		.state('previous', {
            url: '/previous/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {
					return addressService.getAddress($stateParams.id + 1);	   
				   
				}
			}
		})

		.state('newRecord', {
            url: '/new/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function ($stateParams, addressService ) {
					return addressService.getAddress($stateParams.id + 1);	   
				   
				}
			}
		})		

   .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html' 
    });
        
})


.run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
	    console.log('$stateChangeError - fired when an error occurs during transition.');
	    //console.log(arguments);

	    console.log('arguments: ' + error);
	    console.log('arguments: ' + toParams);
	    console.log('arguments: ' + fromParams);

	});
	  
	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
	    console.log('$stateChangeSuccess to ' + toState.name + ' - fired once the state transition is complete.');

	    console.log('arguments: toParams: ' + JSON.stringify(toParams));

	});



	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) { 
	    console.log('stateChangeStart: toParams: ' + JSON.stringify(toParams));
	    console.log('stateChangeStart: toState: ' + JSON.stringify(toState));

	    console.log("state change start");
	});



/*
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
	    console.log("root change error");
	});
*/

});


	
