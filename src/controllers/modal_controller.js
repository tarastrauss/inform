(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("ModalController", ModalController);

  ModalController.$inject = ['$uibModal', '$scope', '$timeout'];

  function ModalController($uibModal, $scope, $timeout) {

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
        $scope.openSignUp();
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openSignUp= function (){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'signUpModal.html',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    // $timeout(function() {
    //  $('#intro-buttons').append('<span id="login" ng-click="openLogin('true')" class="intro btn btn-default fadeIn animated"> Login </span>');
    //  $('#intro-buttons').append('<span id="started" class="intro btn btn-default fadeIn animated" > Get Started </span>');
    // }, 1100);

    $timeout(function(){
      $scope.showLoginButtons = true;
    }, 1100);
    // $('.content').on("click", "#login", function() {
    //   $scope.openLogin('true');
    // });

    // $('.content').on("click", "#started", function() {
    //   $scope.openStarted();
    // });

  }

  angular
      .module("informApp")
      .controller("ModalInstanceController", ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance'];

    function ModalInstanceController($scope, $uibModalInstance) {

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
      };

      $scope.signUp = function() {
        $uibModalInstance.close();
      }
    };
})();
