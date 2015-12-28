(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("ModalController", ModalController);

  ModalController.$inject = ['$uibModal', '$scope', '$timeout', 'userService', '$state'];

  function ModalController($uibModal, $scope, $timeout, userService, $state) {

    $scope.userService = userService;

    $scope.changeState = function () {
      $state.go('feedPage');
    }

    $scope.openLogin = function (){

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'loginModal.html',
        size: 'sm',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

    $scope.openStarted = function (){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'startedModal.html',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {
      //   $scope.openSignUp();
      // }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    // $scope.openSignUp= function (){
    //   var modalInstance = $uibModal.open({
    //     animation: true,
    //     templateUrl: 'signUpModal.html',
    //     controller: ModalInstanceController,
    //     resolve: {

    //     }
    //   });

    //   modalInstance.result.then(function () {

    //   }, function () {
    //     console.log('Modal dismissed at: ' + new Date());
    //   });
    // };


    $timeout(function(){
      $scope.showLoginButtons = true;
    }, 1100);

  }

  angular
      .module("informApp")
      .controller("ModalInstanceController", ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'sessionService', '$auth', '$window'];

    function ModalInstanceController($scope, $uibModalInstance, sessionService, $auth, $window) {

      $scope.random = Math.floor((Math.random() * 2) + 1);
      $scope.color = $scope.random === 1 ? "primary" : "danger";

      $scope.ok = function () {
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };


      $scope.getStarted = function () {
        $uibModalInstance.close();
        // sessionService.facebookLogin();
        $auth.authenticate('facebook')
        // $auth.link('facebook')
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        });

      };

      $scope.signUp = function() {
        $uibModalInstance.close();
      }
    };
})();
