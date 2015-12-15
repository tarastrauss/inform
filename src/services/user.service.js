(function() {
  "use strict";

  angular
    .module("informApp")
    .factory('userService', userService);

    userService.$inject = ['$rootScope'];

    function userService ($rootScope) {

      var user = {
        userInfo: userInfo,
        loggedIn: false,
        getUser: getUser
      }

      var userInfo;

      var getUser = function(){
        $http.get('/api/user').then(function(response) {
          userInfo = response.data;
        });
      }

    return user;
    }
})();
