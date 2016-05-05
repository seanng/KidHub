if (Meteor.isClient) {
  Meteor.subscribe('userInfo');

  angular.module('KidHubApp')
  .controller('ProfileCtrl', ['$scope', '$meteor', '$stateParams', '$state', '$location', '$mdDialog', '$mdMedia', function($scope, $meteor, $stateParams, $state, $location, $mdDialog, $mdMedia){

    // if (Meteor.user()._id !== $stateParams.userId){
    //   $state.go('welcome');
    // }

    var extractUserEmail = function () {
      var user = Meteor.user();
      return user && user.emails[0].address;
    };

    var extractUserProfile = function (key){
      var user = Meteor.user();
      console.log(user);
      return user && user.profile[key];
    };

    $scope.user = {
      firstname: extractUserProfile('firstname'),
      lastname: extractUserProfile('lastname'),
      email: extractUserEmail(),
      phone: extractUserProfile('phone') || '' ,
      children: extractUserProfile('children') || []
    };

    $scope.addChildAction = function(){
      console.log($scope.user);
      var newChild = { name: '', age: '', gender: '' };
      $scope.user.children.push(newChild);
    };

    $scope.removeChild = function(i) {
      $scope.user.children.splice(i, 1);
    };

    $scope.saveProfileAction = function(ev) {
      if ($scope.user.children.length > 0 && $scope.user.firstname && $scope.user.lastname && $scope.user.email) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.firstname': $scope.user.firstname, 'profile.lastname': $scope.user.lastname, 'profile.email': $scope.user.email, 'profile.phone': $scope.user.phone, 'profile.children': $scope.user.children}}, function(err){
          if (err){
            return console.log(err);
          }
          console.log ($state);
          window.location.href ='/home';
        });
      } else {
        showAlert(ev);
        // Alert box
      }
    };

    var showAlert = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#warningContainer')))
          .clickOutsideToClose(true)
          .textContent('You must fill out your personal details and children information before saving.')
          .ariaLabel('Alert Dialog')
          .ok('Got it!')
          .targetEvent(ev)
        );
    };
  }]);
}

if (Meteor.isServer) {
  Meteor.publish('userInfo', function(){
    // return Users.find({});
  });
}