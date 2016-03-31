if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('HomeCtrl', ['$scope','$meteor', function($scope, $meteor){

    $scope.timeslotFilters = function(timeslot) {
      return checkFilter(timeslot, 'district') && checkFilter(timeslot, 'category') && checkAge(timeslot); // && checkRange(timeslot)
    };

    function checkFilter (timeslot, key) { // 'district'
      var filtersArr = $scope.appliedFilters[key]; // ['Hong Kong Island']
      var value     = timeslot[key];                 // whatever the distrct for the timeslot ''

      if (filtersArr.length > 0) {
        var valueIndex = filtersArr.indexOf(value);
        if (valueIndex == -1){
          return false;
        }
      }
      return true;
    }

    function checkAge (timeslot) {
      var ageArray = timeslot.ages;
      if ($scope.appliedFilters.age.length > 0){
        for (var i=0; i < $scope.appliedFilters.age.length; i++) {
          var ageGroupStr = $scope.appliedFilters.age[i];
          var min = $scope.ageGroups[ageGroupStr].ageLow;
          var max = $scope.ageGroups[ageGroupStr].ageHigh;
          var ageLow = timeslot.ageLow;
          var ageHigh = timeslot.ageHigh;

          if ((ageLow < min && min < ageHigh) || (ageLow < max && max < ageHigh) || (min < ageLow && ageHigh < max) ) {
            return true;
          }
        }
        return false;
      }
      return true;
    }


    $scope.appliedFilters = {
      district: [],
      category: [],
      age:      []
    };

    $scope.ageGroups = {
      '0-2': {
        ageLow: 0,
        ageHigh: 2
      },
      '2-5': {
        ageLow: 2,
        ageHigh: 5
      },
      '5-10': {
        ageLow: 5,
        ageHigh: 10
      },
      '10+': {
        ageLow: 10,
        ageHigh: 18
      }
    };

    $scope.filters = {
      district: ["Hong Kong Island", "Kowloon", "New Territories"],
      category: ["Play", "Academic", "Camp", "Arts & Crafts", "Music", "Science", "Sports", "Dance", "Tech"],
      age: ['0-2', '2-5', '5-10', '10+']
    };

    $scope.selectFilter = function (key, value) {
      var valueIndex = $scope.appliedFilters[key].indexOf(value);
      valueIndex === -1 ? $scope.appliedFilters[key].push(value) : $scope.appliedFilters[key].splice(valueIndex, 1);
      console.log($scope.appliedFilters);
    };

    $scope.isFilterSelected = function (key, value) {
      return $scope.appliedFilters[key].indexOf(value) != -1;
    };

    $scope.cancelFilters = function(){
      for (var key in $scope.appliedFilters) {
        $scope.appliedFilters[key] =[];
      }
    };

    $scope.selectDate = function (date) {
      $scope.selectedDayTab = date.formatted;
      populateFeedByDate(date.value);
    };

    var populateFeedByDate = function(value){
      var start = moment(value).startOf('day').toDate();
      var end = moment(value).endOf('day').toDate();
      var timeslots = Timeslots.find({date: {$gte: start, $lte: end}}).fetch();
      timeslots.forEach(function(act){
        act.ageLow = Array.min(act.ages);
        act.ageHigh = Array.max(act.ages);
        act.activity_id = act.activity_id._str;
        act.time = moment(act.date).format('hA');
      });
      $scope.timeslots = timeslots;
      console.log($scope.timeslots);
      stroll.bind('.feed-item-actual');
    };

    var generateDayTabs = function() {
      $scope.dayTabs = [];
      for (var i = 0; i < 8; i++) {
        var date = moment().add(i, 'd');
        var formattedDate = date.format("D MMM");
        $scope.dayTabs.push({
          formatted: formattedDate,
          value: date
        });
      }
      $scope.selectedDayTab = $scope.dayTabs[0].formatted;
    };

    // SLIDERS

    var times = ['5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
    $scope.timeSlider = {
      min: 0,
      max: times.length-1,
      options: {
        stepsArray: times
      }
    };

    $scope.tokenSlider= {
      min: 1,
      max: 5,
      options: {
        floor: 1,
        ceil: 5,
        showTicksValues: true
      }
    };

    // MAP Stuff

    // var drawMarker = function(map, timeslot){
    //   var latlng = {lat: timeslot.placeLat, lng: timeslot.placeLong};
    //   var marker = new google.maps.Marker({
    //     position: latlng,
    //     map: map,
    //     title: timeslot.name
    //   });

    //   marker.addListener('click', function(){
    //     $('[data-name="'+pin.place.name+'"]')[0].click(function () {
    //     });
    //   });
    // };

    // var renderMap = function() {
    //   var map = new google.maps.Map(document.getElementById('googlemap'), {
    //     center: {lat: 22.2783, lng: 114.1747},
    //     scrollwheel: false,
    //     zoom: 12
    //   });

    // };

    $scope.map = { center: { latitude: 22.2783, longitude: 114.1747}, zoom: 12};


    //INITIALIZATION
    var init = function () {
      $scope.showMoreFilters = false;

      generateDayTabs();
      populateFeedByDate($scope.dayTabs.value);
    };

    init();
  }]);

}


if (Meteor.isServer) {

}
