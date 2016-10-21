

var myApp = angular.module('myApp', ['ui.router', '720kb.tooltips'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
 

	$locationProvider.html5Mode(false);
 
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
			
        })
		.state('edit', {
            url: '/edit/:id',
			controller: 'recordController as rc',
			templateUrl: 'templates/editAddressForm.html',
			resolve: {
				recordx: function ($stateParams, addressService ) {
				   return addressService.getAddress($stateParams.id);
				},
				recordid:function ($stateParams) {
				   return $stateParams.id;
				},
			}
		})	
		.state('all', {
            url: '/all',
			controller: 'recordListController as rlc',
			templateUrl: 'templates/addresses.html',
			resolve: {
				records: function (addressService ) {
				   return addressService.getAddresses();
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

});


	
