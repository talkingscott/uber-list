var app = angular.module('list', ['ngAnimate', 'ngTouch']);

var ctrl = app.controller('ListCtrl', ['$scope', '$log', function ($scope, $log) {
  $scope.lists = [
    {name: 'Acme', items: ['bread', 'soda', 'fish', 'cheese']},
    {name: 'Target', items: ['frozen lunches', 'Zyrtec', 'container']},
    {name: 'Home Depot', items: ['BR40 bulbs', 'gas additive']}
  ];

  $scope.visible = {};
  for (var name in $scope.lists) {
    $scope.visible[name] = false;
  }
  
  $scope.isVisible = function (name) {
    return $scope.visible[name];
  };
  
  $scope.toggle = function (name) {
    $scope.visible[name] = ! $scope.visible[name];
  };
}]);
