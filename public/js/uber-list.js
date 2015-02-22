var app = angular.module('list', ['ngAnimate', 'ngTouch']);

var ctrl = app.controller('ListCtrl', ['$scope', '$log', function ($scope, $log) {
  // read lists from local store
  if (window.localStorage) {
    var lists_json = window.localStorage.getItem('uber-list-lists');
    if (lists_json) {
      $scope.lists = angular.fromJson(lists_json);
    }
  }
  // TODO: read lists from backing store N.B. to handle off-line, this must merge)
  if (! $scope.lists) {
    $scope.lists = [
      {name: 'Acme', items: ['bread', 'soda', 'fish', 'cheese']},
      {name: 'Target', items: ['frozen lunches', 'Zyrtec', 'container']},
      {name: 'Home Depot', items: ['BR40 bulbs', 'gas additive']}
    ];
  }

  $scope.visible = {};
  $scope.insertable = {};
  $scope.list_map = {};
  $scope.new_items = {};
  $scope.lists.forEach(function (list) {
    $scope.visible[list.name] = false;
    $scope.insertable[list.name] = false;
    $scope.list_map[list.name] = list;
    $scope.new_items[list.name] = '';
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
    if (!item) {
      return;
    }
    var list = $scope.list_map[list_name];
    if (list.items.indexOf(item) >= 0) {
      return;
    }
    $log.info('item ' + item + ' new_item ' + $scope.new_items[list_name]);
    list.items.push(item);
    // update lists in local store
    if (window.localStorage) {
      window.localStorage.setItem('uber-list-lists', angular.toJson($scope.lists));
    }
    // TODO: update lists in backing store (N.B. to handle off-line this must merge)
    $scope.new_items[list_name] = '';
  }
  
}]);
