if (Meteor.isClient) {

  angular.module('KidHubApp')
    .controller('SelectChildCtrl', ['$scope', '$meteor', '$mdDialog', 'timeslot', '$location', function($scope, $meteor, $mdDialog, timeslot, $location){

      $scope.invalidSelection = false;
      var user = Meteor.user();
      console.log(timeslot);
      $scope.timeslot = timeslot;

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.selectedChild = null;

      $scope.children = Meteor.user().profile.children;

      var registerChild = function(user, ev) {
        console.log(user);
        var newDate = new Date();
        var newHistory = user.profile.history;
        newHistory.push({timeslot_id: timeslot._id, activity_name: timeslot.name, timeslot: timeslot.date, activity_cost: timeslot.tokens, date_purchased: newDate, child: $scope.selectedChild});

        //Update user
        Meteor.users.update({_id: user._id}, {$set: {'profile.tokens': (user.profile.tokens - timeslot.tokens), 'profile.history': newHistory}}, function(err){
          if (err) { return console.log(err); }
          var newRegistrations = Timeslots.findOne({_id: timeslot._id}).registrations;
          newRegistrations.push({userid: user._id, child: $scope.selectedChild, date_purchased: newDate});

          //Update timeslot
          Timeslots.update({_id: timeslot._id}, {$set:{registrations: newRegistrations}}, function(err){
            if (err){ return console.log(err); }
            console.log('child registration is successful!!');
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title($scope.selectedChild + ' has been registered.')
                .textContent('You have paid ' + timeslot.tokens + " tokens. Remember, it's " +timeslot.time+ ". Don't be late!")
                .ok("Got it!")
                .targetEvent(ev)
            ).then(function(){
              window.location.href= '/home';
            });
          });
        });
      };

      $scope.register = function(ev){
        if ($scope.selectedChild) {
          if (user.profile.tokens >= timeslot.tokens){
            registerChild(user, ev);
          } else {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('You do not have enough tokens.')
                .ok("Got it!")
                .targetEvent(ev)
            );
          }
        } else {
        $scope.invalidSelection = true;
      }
    };
  }]);
}

if (Meteor.isServer) {

}