(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("CivicsController", CivicsController);

  CivicsController.$inject = ["$log", "userDataService", "$http", "$state", '$scope'];

  function CivicsController($log, userDataService, $http, $state, $scope) {
    var vm = this;

    vm.message = "test message";
    vm.user = userDataService;

    vm.currentPage = 0;
    vm.pageSize = 5;

    vm.addAddress = function () {
      vm.changeAddress = false;
      var address = vm.street + " " + vm.city + ", " + vm.state + " " + vm.zip;
      $log.log('Attempgint to get polling information for ', address);
      return $http({
        url:     "/api/searchVote",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          address: address
        })
      }).then(function(data) {

        vm.civicsResult = data.data;
        $log.log('the polling results are', vm.civicsResult);
        vm.pollingPlace = vm.civicsResult.pollingLocations[0];
        console.log('the polling information is ', vm.pollingPlace);
        vm.user.addAddressAndPoll(address, vm.pollingPlace, vm.civicsResult.state[0], vm.civicsResult.contests)
        return vm.pollingPlace;
      });
    }

    vm.addElectionClick = function(race, name, party) {
      $log.log("adding election click!");
      vm.user.addElectionClick(race, name, party);
    }

    vm.oneAtATime = true;


    vm.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

  }
})();
