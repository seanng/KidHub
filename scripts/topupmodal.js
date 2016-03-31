if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('TopupCtrl', ['$scope','$meteor', '$location', '$timeout', function($scope, $meteor, $timeout, $location){

    var tokenValue = 500;
    $scope.progressvalue = 33;
    $scope.nextButton = "Next";

    $('#topup-modal').on('hidden.bs.modal', function(e){
      $scope.progressvalue = 33;
      $scope.nextButton = "Next";
      $scope.$apply();
    });

    $scope.nextAction = function(){
      if ($scope.progressvalue === 99){
        $('#topup-modal').modal('toggle');
      } else if ($scope.progressvalue ===66){
        $scope.nextButton = "Close";
        $scope.progressvalue+=33;
      } else if ($scope.progressvalue === 33){
        $scope.nextButton = "Pay $"+tokenValue;
        $scope.progressvalue+=33;
      }
    };

    $scope.backAction = function(){
      $scope.nextButton = "Next";
      $scope.progressvalue-=33;
    };

    //Step 1
    $scope.paymentOption = null;

    //Step 2

  }]);
}

if (Meteor.isServer) {

}