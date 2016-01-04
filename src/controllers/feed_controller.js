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
      searchService.searchCall(param)
        .then(function() {
          //vm.searchService = searchService;
        //           body.result.docs.forEach(function(date){
        //   moment(source.enriched.url.publicationDate.date).format('MMMM Do YYYY');
        // }
          $log.debug('the results in the feed controller are ', vm.searchService.result);
          //$state.reload();
          //$state.go('feedPage');
        });
        // }).then(function() {
        //  // $scope.$evalAsync();
        // });
      // return $http({
      //   url:     "/api/search",
      //   method:  "POST",
      //   headers: {"Content-Type": "application/json"},
      //   data: angular.toJson({
      //     parameter: param
      //   })
      // }).then(function(data) {
      //   // vm.user.currentUser = data.data.data;
      //   vm.articles = data.data.result.docs;
      //   $log.log('the articles are', vm.articles);
      //   //$log.log('After searching, the user data is', vm.user.currentUser);
      //   return vm.articles;
      //   // return vm.user.currentUser;
      // });
    }

    vm.addPoints = function (sentiment) {
      vm.user.sendPointInfo(sentiment, vm.searchService.param);
    }

  }
})();
