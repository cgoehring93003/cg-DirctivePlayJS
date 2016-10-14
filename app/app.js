

var myApp = angular.module('myApp', ['ui.router', '720kb.tooltips'])

.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        .state('editAddress', {
            url: '/edit/:id',
			controller: 'formController as fmc',
            templateUrl: 'templates/editAddressForm.html',
			resolve: {
				record: function(id) {
					return fmc.getById(id);
				}
			}
        })       
        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html' 
        });
        
})


.run(function($rootScope) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
    });		  
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeSuccess to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
    });		  

});
	


	
