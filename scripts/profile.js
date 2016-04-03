if (Meteor.isClient) {
  Meteor.subscribe('userInfo');

  angular.module('KidHubApp')
  .controller('ProfileCtrl', ['$scope', '$location', '$meteor', '$stateParams', '$state', '$mdDialog', '$mdMedia', function($scope, $meteor, $stateParams, $state, $location, $mdDialog, $mdMedia){

    console.log (Meteor.user()._id);
    console.log('hihihi', $stateParams.userId);

    // if (Meteor.user()._id !== $stateParams.userId){
    //   $state.go('welcome');
    // }

    var founduser = Meteor.users.findOne({_id: Meteor.userId()});

    console.log(founduser);

    $scope.user = {
      firstname:'',
      lastname: '',
      email: founduser.emails[0].address,
      phone: '',
      children:[]
    };

    if (founduser.profile) {
      $scope.user.firstname = founduser.profile.firstname;
      $scope.user.lastname = founduser.profile.lastname;
      $scope.user.children = founduser.profile.children;
      if (founduser.profile.phone) {
        $scope.user.phone = founduser.profile.phone;
      }
    }

    $scope.addChildAction = function(){
      var newChild = { name: '', age: '', gender: '' };
      $scope.user.children.push(newChild);
    };

    $scope.removeChild = function(i) {
      $scope.user.children.splice(i, 1);
    };

    $scope.saveProfileAction = function(ev) {
      console.log($state);
      if ($scope.user.children.length > 0 && $scope.user.firstname && $scope.user.lastname && $scope.user.email) {
        Meteor.users.update({_id: founduser._id}, {$set: {'profile.firstname': $scope.user.firstname, 'profile.lastname': $scope.user.lastname, 'profile.email': $scope.user.email, 'profile.phone': $scope.user.phone, 'profile.children': $scope.user.children}});
        console.log('success');
        $state.go('home');

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