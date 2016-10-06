
var myApp = angular.module('myApp', [])
.controller('listController', ['$scope', listController]);

var xdata =
[
  {
    "author" : "Billy Bob",
    "text" : "Check out my new Angular widget!"
  },
  
  {
    "author" : "Rick",
    "text" : "Check out my new house!"
  },  
  {
    "author" : "David",
    "text" : "Check out my new truck!"
  }, 
  {
    "author" : "Ron",
    "text" : "Check out my new Angular widget!"
  },  
  {
  	"author" : "Edna",
    "text" : "Check out my new suit cases!"
  },  
  {
  	"author" : "Janet",
    "text" : "I love directives!"
  }
  
];


function listController($scope) {
  $scope.data = xdata;
}




