if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('HomeCtrl', ['$scope','$meteor', function($scope, $meteor){

    $scope.showMoreFilters = false;

    $(function(){
      $('#timeSlider').slider();
    });


    $(function(){
      $('#creditFilterSlider').slider({max: 5}).slider("pips",{ rest: 'label'});
    });

    $scope.filterSelected = function(){
      // perform function here.
    };

    $scope.dayTabs = [];

    var generateDayTabs = function() {
      for (var i = 0; i < 8; i++) {
        var date = moment().add(i, 'd').format("D MMM");
        $scope.dayTabs.push(date);
      }
    };
    generateDayTabs();

  }]);
}


if (Meteor.isServer) {
}
