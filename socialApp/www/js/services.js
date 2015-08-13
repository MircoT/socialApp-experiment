angular.module('starter.services', [])

.factory('SocketIO', ['$rootScope', function($rootScope) {

  var serverName = "http://your_server_url:3000";
  var status = 'disconnected';
  var socket = io(serverName);
  var numUsers = 0;
  var messages = [];

  socket.on('connect', function(msg){
    status = 'connected';
    $rootScope.$broadcast('changed socket state');
  });

  socket.on('disconnect', function(msg){
    status = 'disconnected';
    $rootScope.$broadcast('changed socket state');
  });

  socket.on('reconnect', function(msg){
    status = 'reconnected';
    $rootScope.$broadcast('changed socket state');
  });

  socket.on('reconnecting', function(msg){
    status = 'reconnecting';
    $rootScope.$broadcast('changed socket state');
  });

  socket.on('users num', function(msg){
    numUsers = msg;
    $rootScope.$broadcast('changed socket state');
  });

  socket.on('chat message', function(msg){
    messages.push(msg);
    $rootScope.$broadcast('new message');
  });

  return {
    sendMessage: function(user, message) {
      socket.emit('chat message', { user: user, text: message });
    },
    getStatus: function() { return status; },
    getNumUsers: function() { return numUsers; },
    getMessages: function() { return messages; }
  };

}])

.factory('User', ['$localstorage', function($localstorage) {

  $localstorage.set('username', 'User'.concat(Math.round(Math.random() * 1000000).toString()));

  return {
    setUsername: function(name) {
      $localstorage.set('username', name);
    },
    getUsername: function() {
      return $localstorage.get('username');
    }
  };

}])

.factory('$localstorage', ['$window', function($window) {

  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };

}]);
