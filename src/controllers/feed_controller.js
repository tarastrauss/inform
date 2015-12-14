(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("FeedController", FeedController);

  FeedController.$inject = ["$log"];


  function FeedController($log) {
    var vm = this;

    vm.message = "fun";

    // vm.user = userDataService;

  }
})();
