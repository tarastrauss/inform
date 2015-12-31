(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("FeedController", FeedController);

  FeedController.$inject = ["$log", "userDataService", "$http"];


  function FeedController($log, userDataService, $http) {
    var vm = this;

    vm.message = "fun";

    vm.user = userDataService;

    // vm.articles = ["hi"];


    // vm.user = userDataService;

    vm.search = function (param) {
      $log.debug("Making call to server for API search");
      return $http({
        url:     "/api/search",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          parameter: param
        })
      }).then(function(data) {
        // vm.user.currentUser = data.data.data;
        vm.articles = data.data.result.docs;
        $log.log('the articles are', vm.articles);
        //$log.log('After searching, the user data is', vm.user.currentUser);
        return vm.articles;
        // return vm.user.currentUser;
      });
    }

  }
})();
