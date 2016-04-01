
if (Meteor.isClient) {
  Meteor.subscribe('activityInfo');

  angular.module('KidHubApp')
  .controller('ActivityCtrl', ['$scope','$meteor', '$stateParams', '$state', function($scope, $meteor, $stateParams, $state){
    if ($stateParams.activityId.length === 24) {
      var activityID = new ObjectID($stateParams.activityId);
      $scope.activity = Activities.findOne({_id: activityID});
      $scope.ageLow = Array.min($scope.activity.ages);
      $scope.ageHigh = Array.max($scope.activity.ages);
      $scope.dates = [];

      var allTimeslots = Timeslots.find({activity_id: activityID}, {sort: {date: 1}}).fetch();
      // sort alltimeslots by time
      allTimeslots.forEach(function(elem){
        var event = moment(elem.date).format("ha") + " "+ moment(elem.date).format("dddd, DD MMMM");
        $scope.dates.push(event);
      });

      $scope.map = { center: { latitude: $scope.activity.placeLat, longitude: $scope.activity.placeLong}, zoom: 12};
      $scope.marker = {

      };

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
