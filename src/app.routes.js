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

    $urlRouterProvider.otherwise("/");
  }

})();
