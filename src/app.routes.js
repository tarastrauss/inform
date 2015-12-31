(function() {
  "use strict";

  angular
    .module("informApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("landingPage", {
        url: "/",
        views: {
          content: {
            templateUrl: "/templates/landing.html"
          }
        },
        controller: "MainController",
        controllerAs: "vm"
      })
      .state("profilePage", {
        url: "/profile",
        templateUrl:  "/templates/profile.html"
      })
      .state("feedPage", {
        url: "/feed",
        views: {
          nav: {
            templateUrl: '/templates/navbar.html'
          },
          content: {
            templateUrl: "/templates/feed.html"
          }
        },
        controller: "FeedController",
        controllerAs: "vm",
        resolve: {
          userPrep: userPrep
        }
      });

  function userPrep(userDataService) {
    userDataService.currentUserData();
  }

    $urlRouterProvider.otherwise("/");
  }


})();
