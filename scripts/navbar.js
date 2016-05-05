if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('NavbarCtrl', ['$scope','$meteor', '$location', '$state', function($scope, $meteor,$location, $state){

    setTimeout(function(){
      $scope.currentuser = Meteor.user();
      console.log('test2',$scope.currentuser);
    }, 500);

    if (Meteor.user()){
      $scope.currentuser = Meteor.user();
      console.log($scope.currentuser);
    }

    $scope.signOut = function() {
      Meteor.logout(function(error){
        console.log (error);
        $state.go('welcome');
      });
    };

  }]);
}




if (Meteor.isServer) {
}
