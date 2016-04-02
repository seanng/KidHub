if (Meteor.isClient) {
  Meteor.subscribe('userInfo');

  angular.module('KidHubApp')
  .controller('ProfileCtrl', ['$scope', '$location', '$meteor', '$stateParams', '$state', '$mdDialog', '$mdMedia', function($scope, $meteor, $stateParams, $state, $location, $mdDialog, $mdMedia){

    console.log (Meteor.user()._id);
    console.log('hihihi', $stateParams.userId);

    // if (Meteor.user()._id !== $stateParams.userId){
    //   $state.go('welcome');
    // }

    var founduser = Meteor.users.findOne({_id: Meteor.user()._id});
    console.log(founduser);

    $scope.user = {
      firstname: founduser.firstname,
      lastname: founduser.lastname,
      email: founduser.emails[0].address,
      phone: founduser.phone
    };

    $scope.children = [];
    $scope.addChildAction = function(){
      var newChild = { name: '', age: '', gender: '' };
      $scope.children.push(newChild);
    };

    $scope.removeChild = function(i) {
      $scope.children.splice(i, 1);
    };

    $scope.saveProfileAction = function(ev) {
      if ($scope.children.length > 0 && $scope.user.firstname && $scope.user.lastname && $scope.user.email) {
        // Meteor.user().insert ..?
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