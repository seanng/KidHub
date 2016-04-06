if (Meteor.isClient) {
  Meteor.subscribe('userInfo');

  angular.module('KidHubApp')
  .controller('UserInfoCtrl', ['$scope', '$location', '$meteor', '$stateParams', '$state', '$mdDialog', '$mdMedia', function($scope, $meteor, $stateParams, $state, $location, $mdDialog, $mdMedia){

    var founduser = Meteor.users.findOne({_id: Meteor.userId()});
    if (founduser.profile.history){
      $scope.firstname = founduser.profile.firstname;
      $scope.history = founduser.profile.history;
      $scope.history.forEach(function(order){
        var time = order.date_purchased;
        var formatted_purchase_date = moment(time).format("h:mm a, MMM Do");
        console.log(order);
        var timeslot = order.timeslot;
        var formatted_slot = moment(timeslot).format("ha, MMM Do");
        order.date_purchased_formatted = formatted_purchase_date;
        order.formatted_slot = formatted_slot;
        order.activity_id = order.activity_id.valueOf();
      });
    }

  }]);
}

if (Meteor.isServer) {
  Meteor.publish('userInfo', function(){
    // return Users.find({});
  });
}