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
      'Logout'
    ];



    dd.isCollapsed = true;

    // dd.status = {
    //   isopen: false
    // };

    // dd.toggled = function(open) {
    //   $log.log('Dropdown is now: ', open);
    // };

    // dd.toggleDropdown = function($event) {
    //   $event.preventDefault();
    //   $event.stopPropagation();
    //   $scope.status.isopen = !$scope.status.isopen;
    // };

    dd.loadData = function () {
      userDataService.currentUserData()
      .then(function() {
        dd.currentUser = userDataService.currentUser;
      });
    }

    dd.loadData();

  };

})();
