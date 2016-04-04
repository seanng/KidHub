if (Meteor.isClient) {

  angular.module('KidHubApp')
    .controller('SelectChildCtrl', ['$scope', '$meteor', '$mdDialog', 'timeslot', function($scope, $meteor, $mdDialog, timeslot){

      console.log(timeslot);
      $scope.timeslot = timeslot;

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.children = Meteor.user().profile.children;

    // $mdDialog.show(
    //   $mdDialog.alert()
    //     .clickOutsideToClose(true)
    //     .title('You paid '+ timeslot.tokens + ' tokens!')
    //     .textContent('Child registration pending. Check out your registration history to register your child.')
    //     .ok("Got it!")
    // );
  }]);
}

if (Meteor.isServer) {

}