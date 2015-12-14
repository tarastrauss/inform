(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("MainController", MainController);

  MainController.$inject = ["$log"];


  function MainController($log) {
    var vm = this;

    vm.message = "fun";

    vm.username;
    vm.password;

  }
})();
