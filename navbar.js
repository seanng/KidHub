if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('NavbarCtrl', ['$scope','$meteor', '$location', function($scope, $meteor,$location){

    $scope.signOut = function() {
      Meteor.logout(function(){
        $location.path('/');
      });
    };

  }]);
}




if (Meteor.isServer) {
}
