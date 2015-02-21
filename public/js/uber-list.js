var app = angular.module('list', ['ngAnimate', 'ngTouch']);

var ctrl = app.controller('ListCtrl', ['$scope', '$log', function ($scope, $log) {
  $scope.lists = [
    {name: 'Acme', items: ['bread', 'soda', 'fish', 'cheese']},
    {name: 'Target', items: ['frozen lunches', 'Zyrtec', 'container']},
    {name: 'Home Depot', items: ['BR40 bulbs', 'gas additive']}
  ];

  $scope.newItem = "";
  
  $scope.visible = {};
  $scope.insertable = {};
  $scope.list_map = {};
  $scope.lists.forEach(function (list) {
    $scope.visible[list.name] = false;
    $scope.insertable[list.name] = false;
    $scope.list_map[list.name] = list;
  });
  
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

  $scope.addItem = function (list_name, item) {
    var list = $scope.list_map[list_name];
    list.items.push(item);
    $log.info('item ' + item + ' newItem ' + $scope.newItem);
    $scope.newItem = "";
  }
}]);
