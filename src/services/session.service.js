(function() {
  "use strict";

  angular
    .module("informApp")
    .factory('sessionService', sessionService);

    sessionService.$inject = ['$rootScope', '$window', '$http'];

    function sessionService ($rootScope, $window, $http) {

        // var user = userService;

        var session = {
            init: function () {
                this.resetSession();
            },
            resetSession: function() {
                $rootScope.currentUser = null;
                $rootScope.isLoggedIn = false;
            },
            facebookLogin: function() {
                console.log('hi');
                // var url = '/auth/facebook',
                //     width = 1000,
                //     height = 650,
                //     top = (window.outerHeight - height) / 2,
                //     left = (window.outerWidth - width) / 2;
                // $window.open(url, 'facebook_login', 'width=' + width + ',height='
                //   + height + ',scrollbars=0,top=' + top + ',left=' + left);
                // .then(function(data){
                //   console.log(data);
                //   authSuccess(data.user);

                // });
                $window.location.href= "http://localhost:3000/auth/facebook";
                // $http.get('/auth/facebook', {
                //      headers: {
                //         'Content-Type': 'application/json',
                //         // 'Access-Control-Allow-Origin': '*'
                //     }

                // }).then(function(){
                //     console.log("whats up");
                //     // $rootScope.currentUser = data.user;
                // });
            },
            logout: function() {
                var scope = this;
                $http.get('/logout').success(function() {
                    scope.resetSession();
                    $rootScope.$emit('session-changed');
                });
            },
            authSuccess: function(userData) {
                $rootScope.currentUser = userData;
                $rootScope.isLoggedIn = true;
                $rootScope.$emit('session-changed');
            },
            authFailed: function() {
                $rootScope.resetSession();
                alert('Authentication failed');
            }
        };
        session.init();
        return session;
    };
})();
