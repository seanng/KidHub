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
    console.log($scope.user);

    $scope.user = {

    };


  }]);
}

if (Meteor.isServer) {
  Meteor.publish('userInfo', function(){
    // return Users.find({});
  });
}