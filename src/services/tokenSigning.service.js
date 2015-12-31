(function() {
  "use strict";

  angular
    .module("informApp")
    .factory("tokenSigningService", tokenSigningService);

  tokenSigningService.$inject = ["tokenService", "$log"];

  function tokenSigningService(tokenService, $log) {
    return {
      request: signWithToken
    };

    function signWithToken(request) {
      var token = tokenService.get();
      if (token) {
        $log.debug("Token exists; signing request.");
        request.headers['Authorization'] = `Bearer ${token}`;
      }

      return request;
    }
  }

})();
