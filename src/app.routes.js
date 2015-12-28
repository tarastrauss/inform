(function() {
  "use strict";

  angular
    .module("informApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider", '$locationProvider'];

  function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state("landingPage", {
        url: "/",
        templateUrl: "/templates/landing.html",
        controller: "MainController",
        controllerAs: "vm"
      })
      .state("profilePage", {
        url: "/profile",
        templateUrl:  "/templates/profile.html"
      })
      .state("feedPage", {
        url: "/feed",
        templateUrl: "/templates/feed.html",
        controller: "FeedController",
        controllerAs: "vm"
      });

      // .state("oauth", {
      //   url: "/auth/facebook",

      // })
    $authProvider.loginUrl = 'http://localhost:3000/auth/login';
    $authProvider.signupUrl = 'http://localhost:3000/auth/signup';

    // $authProvider.oauth2({
    //   name: 'facebook',
    //   url: 'http://localhost:3000/auth/facebook',
    //   redirectUri: 'http://localhost:3000/auth/facebook/callback',
    //   clientId: process.env.FACEBOOK_ID,
    //   requiredUrlParams: ['scope'],
    //   scope: ['email'],
    //   scopeDelimiter: '+',
    //   authorizationEndpoint: 'https://graph.facebook.com/endpoint?key=value&amp;access_token=' + process.env.FACEBOOK_ID + '|' + process.env.FACEBOOK_SECRET
    // });

    $urlRouterProvider.otherwise("/");
  }


})();
