if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('FeedCtrl', ['$scope','$meteor', function($scope, $meteor){
    $scope.tester = "this is the scope";
  }]);
}


if (Meteor.isServer) {

}