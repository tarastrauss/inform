(function() {
  "use strict";

  angular
    .module("informApp")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http", '$rootScope'];

  function userDataService($log, $http, $rootScope) {
    var user = {
      email:           "",
      first_name:      "",
      last_name:       "",
      password:        "",
      dob:             new Date(1990, 10, 1),
      create:          create,
      clear:           clear,
      currentUserData: currentUserData,
      currentUser:     {},
      updatePoints:     updatePoints,
      sendPointInfo:   sendPointInfo,
      searchFriend:    searchFriend
    };

    return user;

    function create() {
      $log.debug("Attempting to create:", user);

      return $http({
        url:     "/api/users",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          email:        user.email,
          first_name:   user.first_name,
          last_name:    user.last_name,
          password:     user.password,
          points:       10,
          dob:          user.dob.toISOString()
        })
      }).then(function() {
          currentUserData();
      });
    }

    function updatePoints(newPoints) {
      $log.debug("Attempting to update the level of :", user.currentUser.first_name);

      return $http({
        url:     "/api/me",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          points: newPoints
        })
      }).then(function() {
          currentUserData();
          // $log.log('the updated data is', data.data);
          // authService.currentUser = data.data;
      });
    }

    function clear() {
      $log.debug("Clearing user.");

      user.email       = "";
      user.first_name  = "";
      user.last_name   = "";
      user.password    = "";
      user.dob         = "";
    }

    function currentUserData() {
      $log.debug("Retrieving current user data.");
      return $http({
        url:     "/api/me",
        method:  "GET"
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('user is', user.currentUser);
        return user.currentUser;
      });
    }

    function sendPointInfo(sentiment, param) {
      $log.debug("Attempting to send point info of parameter: ", param, ' and sentiment: ', sentiment);

      return $http({
        url:     "/api/me",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          searchParam: param,
          articleSentiment: sentiment
        })
      }).then(function() {
          currentUserData();
          // $log.log('the updated data is', data.data);
          // authService.currentUser = data.data;
      });
    }

    function searchFriend(friend) {
     $log.debug("Attempting to search database for friend: ", friend);
      return $http({
        url:     "/api/users",
        method:  "GET",
        headers: {"email": friend}
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('user is', user.currentUser);
        return user.currentUser;
      });
    }
  }

})();
