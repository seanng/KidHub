if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('NavbarCtrl', ['$scope','$meteor', '$location', '$state', function($scope, $meteor,$location, $state){

    Meteor.subscribe('checkAuth', {
      onError: function(error){
        console.log('there was an error:', error);
      },
      onReady: function(){
        if (Meteor.user()){
          $scope.currentuser = Meteor.user();
          $scope.signOut = function() {
            Meteor.logout(function(error){
              console.log (error);
              $state.go('welcome');
            });
          };
        }
      }
    });


  }]);
}




if (Meteor.isServer) {

}
