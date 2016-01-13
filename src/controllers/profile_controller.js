(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "userDataService", "$http", "searchService", "$state", '$scope', '$uibModal'];

  function ProfileController($log, userDataService, $http, searchService, $state, $scope, $uibModal) {
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

  $scope.Math=Math;
    vm.currentPage = 0;
    vm.pageSize = 3;
    // vm.data = [];
    vm.numberOfPages=function(){
        return Math.ceil((vm.user.currentUser.queries.length + vm.user.currentUser.voteInfo.researchedCandidates.length) /vm.pageSize);
    }

    vm.openAlgorithm = function (){

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'algorithmModal.html',
        controller: ProfileModalController,
        resolve: {
        }
      });

      modalInstance.result.then(function () {

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

  }

  angular
      .module("informApp")
      .controller("ProfileModalController", ProfileModalController);

    ProfileModalController.$inject = ['$scope', '$uibModalInstance', 'authService', 'userDataService', '$log', '$state'];

    function ProfileModalController($scope, $uibModalInstance,  $log, $state) {

      $scope.ok = function () {
        $uibModalInstance.close();
      };

    $scope.random = Math.floor((Math.random() * 2) + 1);
      $scope.color = $scope.random === 1 ? "primary" : "danger";
    }

})();
