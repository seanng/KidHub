
if (Meteor.isClient) {
  Meteor.subscribe('activityInfo');

  angular.module('KidHubApp')
  .controller('ActivityCtrl', ['$scope','$meteor', '$stateParams', '$state', function($scope, $meteor, $stateParams, $state){
    if ($stateParams.activityId.length === 24) {
      var activityID = new ObjectID($stateParams.activityId);
      $scope.activity = Activities.findOne({_id: activityID});
      $scope.ageLow = Array.min($scope.activity.ages);
      $scope.ageHigh = Array.max($scope.activity.ages);
    } else {
      $state.go('home');
    }
  }]);
}


if (Meteor.isServer) {
  Meteor.publish('activityInfo', function(){
    console.log(Activities);
    return Activities.find({});
  });


}
