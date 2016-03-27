if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('SigninCtrl', ['$scope','$meteor', '$location', function($scope, $meteor, $location){

    $scope.signin = true;

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.runSignIn = function() {
      var email = $scope.user.email;
      var password = $scope.user.password;
      Meteor.loginWithPassword({
        email: email,
        password: password
      }, function(){
        $location.path('/home');
      });
    };

    $scope.runSignUp = function() {
      var email = $scope.user.email;
      var password = $scope.user.password;
      Accounts.createUser({
        email: email,
        password: password
      }, function(){
        $location.path('/home');
      });
    };

  }]);
}


if (Meteor.isServer) {
  // Meteor.users.update(user._id, { $set:
  //   {
  //     "emails.0.verified": true
  //   }
  // });
}
