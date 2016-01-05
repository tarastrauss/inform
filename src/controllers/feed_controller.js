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

    // vm.articles = ["hi"];


    // vm.user = userDataService;

    vm.search = function (param) {
      $log.debug("Hit feed search");
      $state.go('feedPage');
      vm.query ="";
      var lowerParam = angular.lowercase(param)
      searchService.searchCall(lowerParam)
        .then(function() {
          //vm.searchService = searchService;
        //           body.result.docs.forEach(function(date){
        //   moment(source.enriched.url.publicationDate.date).format('MMMM Do YYYY');
        // }
          $log.debug('the results in the feed controller are ', vm.searchService.result);
          //$state.reload();
          //$state.go('feedPage');
        });
    }

    vm.addPoints = function (sentiment) {
      vm.user.sendPointInfo(sentiment, vm.searchService.param);
    }

    vm.currentPage = 0;
    vm.pageSize = 10;
    // vm.data = [];
    vm.numberOfPages=function(){
        return Math.ceil(vm.searchService.result.result.docs.length/vm.pageSize);
    }
    // for (var i=0; i<45; i++) {
    //     vm.data.push("Item "+i);
    // }


//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter


  }

  angular.module('informApp').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
  });

})();
