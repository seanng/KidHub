if (Meteor.isClient) {
  Meteor.subscribe('activityInfo');

  angular.module('KidHubApp')
  .controller('ActivityCtrl', ['$scope','$meteor', '$stateParams', function($scope, $meteor, $stateParams){

    $scope.partyId = $stateParams.partyId;

  }]);
}


if (Meteor.isServer) {
  Meteor.publish('activityInfo', function(){
    console.log(Activities);
    return Activities.find({});
  });
}
