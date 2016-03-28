if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('FeedCtrl', ['$scope','$meteor', function($scope, $meteor){
    $scope.timeslots = [{
      activity_id: 543,
      time: '10:45am',
      duration: '45',
      tokens: 4,
      activity_name: "Junior Muay Thai",
      district: 'Kennedy Town',
      ages: '2-10'
    },{
      activity_id: 12345,
      time: '11:45am',
      duration: '30',
      tokens: 2,
      activity_name: "Arm Wrestling",
      district: 'New Territories',
      ages: '10+'
    }];
  }]);
}


if (Meteor.isServer) {

}