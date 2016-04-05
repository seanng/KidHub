
if (Meteor.isClient) {
  Meteor.subscribe('activityInfo');

  angular.module('KidHubApp')
  .controller('ActivityCtrl', ['$scope','$meteor', '$stateParams', '$mdDialog', '$state', function($scope, $meteor, $stateParams, $mdDialog, $state){
    if ($stateParams.activityId.length === 24) {
      var activityID = new ObjectID($stateParams.activityId);
      $scope.activity = Activities.findOne({_id: activityID});
      $scope.activities = Activities.find().fetch();
      $scope.ageLow = Array.min($scope.activity.ages);
      $scope.ageHigh = Array.max($scope.activity.ages);
      $scope.selectedDate = null;

      $scope.getDates = function(){
        $scope.uniqueDates = {};
        var allTimeslots = null;
        allTimeslots = Timeslots.find({activity_id: activityID}, {sort: {date: 1}}).fetch();
        console.log(allTimeslots);
        allTimeslots.forEach(function(elem){
          var eventDate = moment(elem.date).format("dddd, DD MMMM").toString();
          elem.time = moment(elem.date).format("ha");
          if (!$scope.uniqueDates[eventDate]){
            $scope.uniqueDates[eventDate] = [];
          }
          $scope.uniqueDates[eventDate].push({eventTime: elem.time, date: elem});
        });
      };

      $scope.selectDate = function() {
      };

      $scope.selectTime = function(){
      };

      $scope.reserveAction = function(ev) {
        if ($scope.selectedTime){
          var timeslot = $scope.selectedTime;
          $mdDialog.show({
            controller: 'SelectChildCtrl',
            templateUrl: 'partials/selectchild.html',
            locals: {
              timeslot: timeslot
            },
            parent: angular.element(document.body),
            openFrom: {top: -50, width: 30, height: 80},
            clickOutsideToClose: true
          });
        } else {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('No timeslot selected.')
              .textContent('Please select a date and a timeslot to make a reservation.')
              .ok("Got it!")
              .targetEvent(ev)
          );
        }
      };

var flatmap = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}];

      $scope.map = {
        center: { latitude: $scope.activity.placeLat, longitude: $scope.activity.placeLong},
        zoom: 17,
        options: { styles: flatmap }
      };

      $scope.marker = {
        events: {
          click: function(marker) {
            console.log (marker);
          }
        }
      };

      //map style

    } else {
      $state.go('home');
    }
  }]);
}


if (Meteor.isServer) {
  Meteor.publish('activityInfo', function(){
    // console.log(Activities);
    return Activities.find({});
  });


}
