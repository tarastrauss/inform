(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("MainController", MainController);

  function MainController() {
    var vm = this;

    vm.message = "fun";

  }
})();
