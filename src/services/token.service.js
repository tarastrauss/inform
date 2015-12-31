(function() {
  "use strict";

  angular
    .module("informApp")
    .factory("tokenService", tokenService);

  tokenService.$inject = ["$log", "$window"];

  function tokenService($log, $window) {
    var token = {
      set:   set,
      get:   get,
      clear: clear,
      log:   log
    }

    return token;

    function set(value) {
      $window.localStorage.setItem('token', value);
    }

    function get() {
      return $window.localStorage.getItem('token');
    }

    function clear() {
      $window.localStorage.removeItem('token');
    }

    function log() {
      $log.log("Token: ", token.get());
    }
  }

})();
