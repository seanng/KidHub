if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('ActivityCtrl', ['$scope','$meteor', '$stateParams', function($scope, $meteor, $stateParams){

    $scope.partyId = $stateParams.partyId;

  }]);
}


if (Meteor.isServer) {
}
