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
  
  $scope.insertable = {};
  for (var name in $scope.lists) {
    $scope.insertable[name] = false;
  }
  
  $scope.isVisible = function (name) {
    return $scope.visible[name];
  };
  
  $scope.isInsertable = function (name) {
    return $scope.insertable[name];
  };
  
  $scope.toggle = function (name) {
    $scope.visible[name] = ! $scope.visible[name];
  };
  
  $scope.toggleInsertable = function (name) {
    var insertable = ! $scope.insertable[name];
    if (insertable && ! $scope.visible[name]) {
      $scope.visible[name] = true;
    }
    $scope.insertable[name] = insertable;
  };
}]);
