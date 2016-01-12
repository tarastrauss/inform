(function() {
  "use strict";

  angular
    .module("informApp")
    .factory("searchService", searchService);

    searchService.$inject = ['$http', '$log'];

    function searchService ($http, $log) {

      var search = {
        searchCall:   searchCall,
        result:     [],
        param: "",
        status: ""
      }

      return search;


      function searchCall(param){
        search.param = param;
        $log.debug("Making call to server for API search of ", param);
        return $http({
          url:     "/api/search",
          method:  "POST",
          headers: {"Content-Type": "application/json"},
          data: angular.toJson({
            parameter: param
          })
        }).then(function(data) {
          // vm.user.currentUser = data.data.data;
          search.status = data.data.status;
          search.result = data.data.results.articles;
          $log.log('the api call was made ', data.data.apiCall);
          $log.log('the articles are', search.result);
          // if (search.result.status == "ERROR") {
          //   search.result = [];
          // }
          //$log.log('After searching, the user data is', vm.user.currentUser);
          return search.result;
          // return vm.user.currentUser;
        });

      }
    }


})();
