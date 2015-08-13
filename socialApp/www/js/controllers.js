angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'SocketIO', function($scope, SocketIO) {

  $scope.socketStatus = SocketIO.getStatus();
  $scope.numberOfUsers = SocketIO.getNumUsers();

  $scope.$on('changed socket state', function (event, args) {
    $scope.socketStatus = SocketIO.getStatus();
    $scope.numberOfUsers = SocketIO.getNumUsers();
    $scope.$apply();
  });

}])

.controller('ChatsCtrl', ['$scope', 'SocketIO', 'User', function($scope, SocketIO, User) {
  
  $scope.getUsername = User.getUsername;
  $scope.chat = SocketIO.getMessages();
  $scope.message = {
    text: ""
  };

  $scope.sendMessage = function() {
    if ($scope.message.text.length > 0) {
      SocketIO.sendMessage(User.getUsername(), $scope.message.text);
      $scope.message.text = "";
    }
  };

  $scope.$on('new message', function (event, args) {
    $scope.chat = SocketIO.getMessages();
    $scope.$apply();
  });

}])

.controller('AccountCtrl', ['$scope', 'User', function($scope, User) {

  $scope.user = {
    name: User.getUsername()
  };

  $scope.changeName = function() {
    User.setUsername($scope.user.name);
  };

}]);
