if (Meteor.isClient) {

  angular.module('KidHubApp')
    .controller('SelectChildCtrl', ['$scope', '$meteor', '$mdDialog', 'timeslot', function($scope, $meteor, $mdDialog, timeslot){

      $scope.invalidSelection = false;

      console.log(timeslot);
      $scope.timeslot = timeslot;

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.selectedChild = null;

      $scope.children = Meteor.user().profile.children;

      $scope.register = function(ev){
        if ($scope.selectedChild) {
          // Pay tokens.
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title($scope.selectedChild.name+ ' has been registered.')
              .textContent('You paid ' + timeslot.tokens + " tokens. Don't be late for the "+ timeslot.time + " class!")
              .ok("Got it!")
              .targetEvent(ev)
          );
        } else {
          $scope.invalidSelection = true;
        }
      };
  }]);
}

if (Meteor.isServer) {

}