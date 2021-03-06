(function() {
  "use strict";

  angular
    .module("informApp")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http", '$rootScope', "$state"];

  function userDataService($log, $http, $rootScope, $state) {
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
      searchFriend:    searchFriend,
      friend:          {},
      followUser:      followUser,
      addAddressAndPoll:      addAddressAndPoll,
      addElectionClick: addElectionClick,
      addPropClick:    addPropClick
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
          // user.email = "";
          user.first_name = "";
          user.last_name="";
          // user.password="";
          user.dob = new Date (1990, 10, 1);
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
        url:     "/api/getMe",
        method:  "POST"
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('user is', user.currentUser);
        return user.currentUser;
      }, function errorCallback(response) {
        $state.go('landingPage')
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
        url:     "/api/searchUsers",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
         "email": friend
        })
      }).then(function(data) {
        user.friend = data.data;
        $log.log('friend is', data.data);
        return user.friend;
      });
    }

    function followUser(id) {
      $log.debug("Attempting to add user to friend list with id: ", id);
      return $http({
        url:     "/api/followUser",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
         "id": id
        })
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('User is', data.data.data);
        $log.debug(data.data.message);
        user.friend = {};
        return user.currentUser;
      });
    }

    function addAddressAndPoll(addy, pollingLocation, state, elections) {
     $log.debug("Attempting to user address", addy);
     $log.debug("Attempting to user url", state);
     $log.debug("Attempting to user url", elections);
      return $http({
        url:     "/api/addAddress",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
         address: addy,
         pollingLocation: pollingLocation,
         state: state,
         elections: elections
        })
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('User is', data.data.data);
        $log.debug(data.data.message);
        return user.currentUser;
      });

    }

    function addElectionClick(race, name, party) {
     $log.debug("Attempting to add click for race: ", race);
     $log.debug("Attempting to add click for name: ", name);
     $log.debug("Attempting to add click for party: ", party);
      return $http({
        url:     "/api/clickedCandidate",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
         race: race,
         name: name,
         party: party
        })
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('User is', data.data.data);
        $log.debug(data.data.message);
        return user.currentUser;
      });
    }

    function addPropClick(prop) {
     $log.debug("Attempting to add click for prop: ", prop);
      return $http({
        url:     "/api/clickedProp",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
         prop: prop
        })
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('User is', data.data.data);
        $log.debug(data.data.message);
        return user.currentUser;
      });

    }
  }

})();
