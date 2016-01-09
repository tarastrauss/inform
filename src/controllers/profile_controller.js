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

    vm.followFriend = function(id) {
      $log.debug('Hit follow friend');
      vm.user.followUser(id);
    }

    vm.currentPage = 0;
    vm.pageSize = 3;
    // vm.data = [];
    vm.numberOfPages=function(){
        return Math.ceil(vm.user.currentUser.queries.length/vm.pageSize);
    }

  }
})();
