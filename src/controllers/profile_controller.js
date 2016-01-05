(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "userDataService", "$http", "searchService", "$state", '$scope'];

  function ProfileController($log, userDataService, $http, searchService, $state, $scope) {
    var vm = this;

    vm.user = userDataService;

    vm.friendSearch = function(friend) {
      $log.debug("Hit friend search");
      vm.friend = "";
      vm.user.searchFriend(friend);
    }

  }
})();
