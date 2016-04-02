
if (Meteor.isClient) {
  Meteor.subscribe('activityInfo');

  angular.module('KidHubApp')
  .controller('ActivityCtrl', ['$scope','$meteor', '$stateParams', '$state', function($scope, $meteor, $stateParams, $state){
    if ($stateParams.activityId.length === 24) {
      var activityID = new ObjectID($stateParams.activityId);
      $scope.activity = Activities.findOne({_id: activityID});
      $scope.activities = Activities.find().fetch();
      $scope.ageLow = Array.min($scope.activity.ages);
      $scope.ageHigh = Array.max($scope.activity.ages);
      $scope.uniqueDates = {};
      $scope.selectedDate = null;
      var allTimeslots = Timeslots.find({activity_id: activityID}, {sort: {date: 1}}).fetch();

      var getDates = function(){
        allTimeslots.forEach(function(elem){
          var eventDate = moment(elem.date).format("dddd, DD MMMM").toString();
          var eventTime = moment(elem.date).format("ha");
          if (!$scope.uniqueDates[eventDate]){
            $scope.uniqueDates[eventDate] = [];
          }
          $scope.uniqueDates[eventDate].push(eventTime);
        });
      };

      getDates();

      $scope.selectDate = function(value) {
        console.log(value);
        $scope.selectedDate = value;
      };

      $scope.map = { center: { latitude: $scope.activity.placeLat, longitude: $scope.activity.placeLong}, zoom: 17};
      $scope.marker = {
        events: {
          click: function(marker) {

          }
        }
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
