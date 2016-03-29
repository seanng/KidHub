if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('HomeCtrl', ['$scope','$meteor', function($scope, $meteor){

    console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

    $scope.selectDate = function (date) {
      $scope.selectedDayTab = date;
      var startOfDayUTC = new Date(moment(date + ' ' + moment().year()).utc().startOf('day').format());
      var endOfDateUTC = new Date(moment(date + ' ' + moment().year()).utc().endOf('day').format());
      $scope.timeslots = Timeslots.find({ gte: {date: startOfDayUTC }, lte: {date: endOfDateUTC} }).fetch(); // method 1
    };

    $scope.timeslotFilter = {
      district: 'Kennedy Town'
    };

    var generateDayTabs = function() {
      $scope.dayTabs = [];
      for (var i = 0; i < 8; i++) {
        var date = moment().add(i, 'd').format("D MMM");
        $scope.dayTabs.push(date);
      }
      $scope.selectedDayTab = $scope.dayTabs[0];
    };

    var init = function () {
      $scope.showMoreFilters = false;
      // $scope.timeslots = Timeslots.find().fetch(); // method 2
      $scope.timeslots = [{ // tmp fake data
        activity_id: 543,
        time: '10:45am',
        duration: '45',
        tokens: 4,
        activity_name: "Junior Muay Thai",
        district: 'Kennedy Town',
        ages: '2-10'
      },{
        activity_id: 12345,
        time: '11:45am',
        duration: '30',
        tokens: 2,
        activity_name: "Arm Wrestling",
        district: 'New Territories',
        ages: '10+'
      }];

      $(function(){
        $('#timeSlider').slider();
        $('#creditFilterSlider').slider({max: 5}).slider("pips",{ rest: 'label'});
      });

      generateDayTabs();
    };

    init();
  }]);

}


if (Meteor.isServer) {
}
