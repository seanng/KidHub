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
        //data-toggle close modal with jQuery
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
        //data-toggle close modal with jQuery
        $location.path('/home');
      });
    };

  }]);
}


if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user){
    Meteor.setTimeout(function(){
      Meteor.users.update(user._id, { $set:
      { "emails.0.verified": true }});
    }, 4000);
    return user;
  });
}
