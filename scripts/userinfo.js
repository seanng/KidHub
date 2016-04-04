if (Meteor.isClient) {
  Meteor.subscribe('userInfo');

  angular.module('KidHubApp')
  .controller('UserInfoCtrl', ['$scope', '$location', '$meteor', '$stateParams', '$state', '$mdDialog', '$mdMedia', function($scope, $meteor, $stateParams, $state, $location, $mdDialog, $mdMedia){

    var founduser = Meteor.users.findOne({_id: Meteor.userId()});
    if (founduser.profile.history){

    }

  }]);
}

if (Meteor.isServer) {
  Meteor.publish('userInfo', function(){
    // return Users.find({});
  });
}