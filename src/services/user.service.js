(function() {
  "use strict";

  angular
    .module("informApp")
    .factory('userService', userService);

    userService.$inject = ['$rootScope', '$http'];

    function userService ($rootScope, $http) {

      var user = {
        loggedIn: false,
        getUser: getUser,
        userInfo: {}
      }

      var getUser = function(){
        return $http.get('/api/user').then(function(response) {
          user.userInfo = response.data;
        });
      }

    return user;
    }
})();
