(function() {
  angular.module('informApp', ["ui.router", "ngAnimate", "ui.bootstrap", "satellizer"])
    .config(function($authProvider) {


    $authProvider.oauth2({
      name: 'facebook',
      url: 'http://localhost:3000/auth/facebook',
      redirectUri: 'http://localhost:3000/auth/facebook/callback',
      clientId: process.env.FACEBOOK_ID,
      requiredUrlParams: ['scope'],
      scope: ['email'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://www.facebook.com/dialog/oauth?response_type=code&client_id=' + process.env.FACEBOOK_ID
    });
  });

    // https://www.facebook.com/dialog/oauth?response_type=code&client_id=657854390977827&redirect_uri=https://satellizer.herokuapp.com/&display=popup&scope=email

    // .run(['$rootScope', '$window', 'sessionService', function ($rootScope, $window, sessionService) {
    //   $rootScope.session = sessionService;
    //   $window.app = {
    //       authState: function(state, user) {
    //           $rootScope.$apply(function() {
    //               switch (state) {
    //                   case 'success':
    //                       sessionService.authSuccess(user);
    //                       break;
    //                   case 'failure':
    //                       sessionService.authFailed();
    //                       break;
    //               }
    //           });
    //       }
    //   };
      // if ($window.user !== null) {
      //     sessionService.authSuccess($window.user);
      // }
    // }]);


})();
