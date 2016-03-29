if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('NavbarCtrl', ['$scope','$meteor', '$location', '$state', function($scope, $meteor,$location, $state){

    $scope.signOut = function() {
      Meteor.logout(function(){
        $state.go('welcome');
      });
    };

  }]);
}




if (Meteor.isServer) {
}
