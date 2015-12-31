(function() {
  "use strict";

  angular
      .module("informApp")
      .controller("ModalController", ModalController);

  ModalController.$inject = ['$uibModal', '$scope', '$timeout', 'userDataService', '$state'];

  function ModalController($uibModal, $scope, $timeout, userDataService, $state) {

    $scope.userDataService = userDataService;

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


    $timeout(function(){
      $scope.showLoginButtons = true;
    }, 1100);

  }

  angular
      .module("informApp")
      .controller("ModalInstanceController", ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'authService', 'userDataService', '$log', '$state'];

    function ModalInstanceController($scope, $uibModalInstance, authService, userDataService, $log, $state) {

      $scope.user = userDataService;
      $scope.auth = authService;

      $scope.random = Math.floor((Math.random() * 2) + 1);
      $scope.color = $scope.random === 1 ? "primary" : "danger";

      $scope.ok = function () {
        $uibModalInstance.close();
        $state.go('feedPage');

      };

      $scope.createUser = function() {
        $log.log('creating user!');
        $scope.user.create()
          .then(function(data, status, headers, config) {
            $log.debug("Success:", data,status,headers,config)
            $scope.failureMessage = "Present any error messages here.";
            // $scope.user.clear();
            $uibModalInstance.close();
            $scope.auth.email = $scope.user.email;
            $scope.auth.password = $scope.user.password;
            $scope.logInUser()
          })
          .then(function(){

            // $state.go('gamePage');
          })
          .catch(function(data, status, headers, config) {
            $log.debug("Failure:", data,status,headers,config)
            $scope.successMessage = "Present all of the current user's data here.";
            $scope.failureMessage = angular.toJson(data.data);
          });
      };

      $scope.logInUser = function() {

        $scope.auth.logIn()
          .then(function(data) {
            $log.debug("Success:", data)
             return $scope.user.currentUserData();
          })
          .then(function(data) {
            $log.debug("Success logging user:", data)
            $scope.user.currentUser = data;
            $uibModalInstance.close();
            $state.go('feedPage');
            $scope.auth.clear();

            $scope.successMessage = angular.toJson(data.data);
            $scope.failureMessage = "Present any error messages here.";
          })
          .catch(function(data, status, headers, config) {
            $log.debug("Failure:", data, status, headers, config)
            $scope.successMessage = "Present all of the current user's data here.";
            $scope.failureMessage = angular.toJson(data.data);
          });
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
