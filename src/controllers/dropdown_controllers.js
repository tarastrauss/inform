(function() {
  "use strict";

  angular
      .module("informApp")
      .controller('DropdownController', DropdownController);

  DropdownController.$inject = ["$scope", "$log", "userDataService", "authService", "$state"];

  function DropdownController ($scope, $log, userDataService, authService, $state) {

    var dd = this;
    dd.user = userDataService;
    dd.auth = authService;
    dd.message="hi";

    dd.items = [
      'Profile',
      'Friends',
      'Logout'
    ];

    dd.isCollapsed = true;


    dd.loadData = function () {
      userDataService.currentUserData()
      .then(function() {
        dd.currentUser = userDataService.currentUser;
      });
    }

    dd.loadData();

  };

})();
