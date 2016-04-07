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
      console.log(password);
      var errorSignin = function(err) {
        console.log(err);
        $('#signintitle').html('There was an error. '+err.reason).css('color','red');
      };

      Meteor.loginWithPassword(email, password, function(err){
        if (err){ return errorSignin(err); }
        //data-toggle close modal with jQuery
        $scope.user.email = '';
        $scope.user.password = '';
        window.location.href = '/user/'+Meteor.userId();
      });
    };

    $scope.runSignUp = function() {
      var email = $scope.user.email;
      var password = $scope.user.password;
      var errorSignup = function(err){
        console.log(err);
        $('#signuptitle').html('There was an error. '+ err.reason).css('color','red');
      };

      Accounts.createUser({
        email: email,
        password: password
      }, function(err){
        if (err){ return errorSignup(err); }
        //data-toggle close modal with jQuery
        var userid = Meteor.userId();
        window.location.href = '/user/'+userid;
        $scope.user.email = '';
        $scope.user.password = '';
        Meteor.users.update({_id: userid}, {$set: {'profile.tokens': 0, 'profile.history': []}});
      });
    };

    $('#signin-modal').on('hidden.bs.modal', function(e){
      $('#signintitle').html('Sign in').css('color','black');
      $('#signuptitle').html('Sign up').css('color','black');
      $scope.user.email = '';
      $scope.user.password = '';
    });

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
