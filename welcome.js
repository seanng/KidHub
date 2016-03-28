if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('WelcomeCtrl', ['$scope','$meteor', '$location', function($scope, $meteor, $location){
    if (Meteor.user()){
      $location.path('/home');
    }

  }]);
}


if (Meteor.isServer) {
}
