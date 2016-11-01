if (Meteor.isClient) {

  angular.module('KidHubApp')
  .controller('HomeCtrl', ['$scope', '$meteor', '$mdDialog', function($scope, $meteor, $mdDialog){

    $scope.getActivityObj = function (timeslot) {
      return {
        activityId: timeslot.activity_id
      };
    };

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
      var count = 1;
      var timeslots = Timeslots.find({date: {$gte: start, $lte: end}}, {sort: {date: 1}}).fetch();
      setTimeslots(timeslots);
      var interval = setInterval(function(){
        console.log(count, timeslots);
        if (timeslots.length > 0 || count > 3) {
          clearInterval(interval);
        }
        timeslots = Timeslots.find({date: {$gte: start, $lte: end}}, {sort: {date: 1}}).fetch();
        setTimeslots(timeslots);
        count++;
      }, 500);
    };

    var setTimeslots = function (timeslots) {
      timeslots.forEach(function(act){
        console.log("test");
        act.ageLow = Array.min(act.ages);
        act.ageHigh = Array.max(act.ages);
        act.activity_id = act.activity_id._str;
        act.time = moment(act.date).format('hA');
        act.isActive = false;
        act.icon = 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png';
        act.activateMarker = function (){
          console.log('entered');
          // $scope.map.control.refresh({latitude: this.placeLat, longitude: this.placeLong});
          $scope.map.center = {latitude: this.placeLat, longitude: this.placeLong};
          this.isActive = true;
          this.icon = 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png';
        };
        act.deactivateMarker = function(){
          console.log('left');
          this.isActive = false;
          this.icon = 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png';
        };
      });
      $scope.timeslots = timeslots;
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

    var mapbox = [
        {
            "featureType": "water",
            "stylers": [
                {
                    "saturation": 43
                },
                {
                    "lightness": -11
                },
                {
                    "hue": "#0088ff"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "hue": "#ff0000"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 99
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#808080"
                },
                {
                    "lightness": 54
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ece2d9"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ccdca1"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#767676"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b8cb93"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        }
    ];

    var flatmap = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}];

    $scope.map = {
      center: { latitude: 22.2783, longitude: 114.1747},
      zoom: 13,
      options: {styles: flatmap},
      refresh: false,
      control: {
        refresh: ({latitude: 22.2783, longitude: 114.1747})
      }
    };

    window.debug = $scope.map;

    $scope.markerIcon = function(cat) {
      if (cat=="Play"){
        return 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
      } else if (cat=="Academic"){
        return 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png';
      } else if (cat=="Arts & Crafts"){
        return 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png';
      } else if (cat=="Sports"){
        return 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/purple-dot.png';
      } else if (cat=="Science"){
        return 'https://maps.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png';
      }
    };

    $scope.onClick = function (map,event,timeslot, d){
      console.log(map);
      console.log(event);
      console.log(timeslot);
      console.log(d);
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

// making some changes
// here