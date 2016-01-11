(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("FeedController", FeedController);

  FeedController.$inject = ["$log", "userDataService", "$http", "searchService", "$state", '$scope'];


  function FeedController($log, userDataService, $http, searchService, $state, $scope) {
    var vm = this;

    vm.message = "fun";

    vm.user = userDataService;

    vm.searchService = searchService;

    vm.search = function (param) {
      $log.debug("Hit feed search");
      $state.go('feedPage');
      vm.query ="";
      var lowerParam = angular.lowercase(param)
      searchService.searchCall(lowerParam)
        .then(function() {
          $log.debug('the results in the feed controller are ', vm.searchService.result);
        });
    }

    vm.addPoints = function (sentiment) {
      vm.user.sendPointInfo(sentiment, vm.searchService.param);
    }

    vm.currentPage = 0;
    vm.pageSize = 5;

    vm.numberOfPages=function(){
        return Math.ceil(vm.searchService.result.result.docs.length/vm.pageSize);
    }

  }

  angular.module('informApp').filter('startFrom', function() {
    return function(input, start) {
      if(input !== undefined) {
        start = +start; //parse to int
        return input.slice(start);
      }
    }
  });

})();
