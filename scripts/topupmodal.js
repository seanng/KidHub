if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('TopupCtrl', ['$scope','$meteor', '$location', '$timeout', function($scope, $meteor, $timeout, $location){

    var tokenValue = 500;
    $scope.progressvalue = 1;
    $scope.nextButton = "Next";

    $('#topup-modal').on('hidden.bs.modal', function(e){
      $scope.progressvalue = 1;
      $scope.nextButton = "Next";
      $scope.$apply();
    });

    $scope.nextAction = function(){
      if ($scope.progressvalue === 3){
        $('#topup-modal').modal('toggle');
      } else if ($scope.progressvalue ===2){
        $scope.nextButton = "Close";
        $scope.progressvalue++;
      } else if ($scope.progressvalue === 1){
        $scope.nextButton = "Pay $"+tokenValue;
        $scope.progressvalue++;
      }
    };

    $scope.backAction = function(){
      $scope.nextButton = "Next";
      $scope.progressvalue--;
    };

    //Step 1
    $scope.paymentOption = null;

  }]);
}

if (Meteor.isServer) {

}