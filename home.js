if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('HomeCtrl', ['$scope','$meteor', function($scope, $meteor){

    var today =
    $scope.dayTabs = [today]

  }]);
}


if (Meteor.isServer) {
}
