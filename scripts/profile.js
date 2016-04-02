if (Meteor.isClient) {
  Meteor.subscribe('userInfo');

  angular.module('KidHubApp')
  .controller('ProfileCtrl', ['$scope', '$location', '$meteor', '$stateParams', '$state', function($scope, $meteor, $stateParams, $state, $location){

    console.log (Meteor.user()._id);
    console.log('hihihi', $stateParams.userId);

    // if (Meteor.user()._id !== $stateParams.userId){
    //   $state.go('welcome');
    // }

    $scope.founduser = Meteor.users.findOne({_id: Meteor.user()._id});
    console.log($scope.founduser);

    $scope.children = [];
    //$scope.children.push(users children array);

    // $scope.user = {
    //   firstname: founduser.firstname || ' ',
    //   lastname: founduser.lastname || ' ',
    //   email: founduser.email,
    //   phone: founduser.phone || ' '
    // };

    var newChild = {
      name: $scope.childName,
      age: $scope.childAge,
      gender: $scope.childGender
    };

    $scope.addChildAction = function(){
      $scope.children.push(newChild);
    };

    $scope.saveProfileAction = function() {

    }



  }]);
}

if (Meteor.isServer) {
  Meteor.publish('userInfo', function(){
    // return Users.find({});
  });
}