if (Meteor.isClient) {

  angular.module('KidHubApp')
  .controller('HomeCtrl', ['$scope', '$meteor', '$mdDialog', function($scope, $meteor, $mdDialog){

    $scope.timeslotFilters = function(timeslot) {
      return checkFilter(timeslot, 'district') && checkFilter(timeslot, 'category') && checkAge(timeslot) && checkTokens(timeslot);
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

    function checkTokens (timeslot) {
      var cost = timeslot.tokens;
      if ($scope.tokenSlider >= cost) {
        return true;
      }
      return false;
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
    };

    // $scope.selectTokens = function ()

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

    $scope.verifyRegister = function(timeslot, ev) {
      console.log(timeslot);
      var confirm = $mdDialog.confirm()
        .title('Would you like to register for '+timeslot.name+'?')
        .clickOutsideToClose(true)
        .ok('Yes!')
        .cancel('Nah')
        .targetEvent(ev);

      $mdDialog.show(confirm).then(function(){
        $mdDialog.show({
          controller: 'SelectChildCtrl',
          templateUrl: 'partials/selectchild.html',
          locals: {
            timeslot: timeslot
          },
          parent: angular.element(document.body),
          openFrom: {top: -50, width: 30, height: 80},
          clickOutsideToClose: true
        });
      });
    };

    // Pay the fee. If successful,


    // SLIDER
    $scope.tokenSlider = 5;

    // MAP Stuff

    var lightdream = [
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#FFBB00"
                  },
                  {
                      "saturation": 43.400000000000006
                  },
                  {
                      "lightness": 37.599999999999994
                  },
                  {
                      "gamma": 1
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#00FF6A"
                  },
                  {
                      "saturation": -1.0989010989011234
                  },
                  {
                      "lightness": 11.200000000000017
                  },
                  {
                      "gamma": 1
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#FFC200"
                  },
                  {
                      "saturation": -61.8
                  },
                  {
                      "lightness": 45.599999999999994
                  },
                  {
                      "gamma": 1
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#FF0300"
                  },
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 51.19999999999999
                  },
                  {
                      "gamma": 1
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#FF0300"
                  },
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 52
                  },
                  {
                      "gamma": 1
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#0078FF"
                  },
                  {
                      "saturation": -13.200000000000003
                  },
                  {
                      "lightness": 2.4000000000000057
                  },
                  {
                      "gamma": 1
                  }
              ]
          }
    ];

    $scope.map = {
      center: { latitude: 22.2783, longitude: 114.1747},
      zoom: 11,
      options: {styles: lightdream}
    };

    $scope.markerIcon = function(cat) {
      if (cat=="Play"){
        return 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
      } else if (cat=="Academic"){
        return 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png';
      } else if (cat=="Arts & Crafts"){
        return 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png';
      } else if (cat=="Sports"){
        return 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/purple-dot.png';
      } else if (cat=="Science"){
        return 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png';
      }
    };

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
