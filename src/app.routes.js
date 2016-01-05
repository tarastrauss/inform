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
        views: {
          nav: {
            templateUrl: '/templates/navbar.html'
          },
          content: {
            templateUrl: "/templates/profile.html"
          }
        },
        controller: "ProfileController",
        controllerAs: "vm",
      })
      .state("friendsPage", {
        url: "/friends",
        views: {
          nav: {
            templateUrl: '/templates/navbar.html'
          },
          content: {
            templateUrl: "/templates/friends.html"
          }
        },
        controller: "ProfileController",
        controllerAs: "vm",
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
