if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('HomeCtrl', ['$scope','$meteor', function($scope, $meteor){

    $scope.timeslotFilters = {
      //district, category.
    };

    $scope.moreFilters = {
      district: {
        "Hong Kong Island": false,
        "Kowloon": false,
        "New Territories": false
      },
      category: {
        "Play": false,
        "Academic": false,
        "Camp": false,
        "Arts & Crafts": false,
        "Music": false,
        "Science": false,
        "Sports": false,
        "Dance": false,
        "Tech": false
      }
    };

    $scope.cancelFilters = function(){
      for (var key in $scope.moreFilters){
        if ($scope.moreFilters.hasOwnProperty(key)) {
          for (var boolean in $scope.moreFilters[key]){
            $scope.moreFilters[key][boolean] = false;
          }
        }
      }
      $scope.showMoreFilters = false;
    };

    $scope.applyFilters = function(){
      for (var key in $scope.moreFilters){
        if ($scope.moreFilters.hasOwnProperty(key)) {
          for (var boolean in $scope.moreFilters[key]){
            if ($scope.moreFilters[key][boolean] === true){
              $scope.timeslotFilters[key].push(boolean);
            }
          }
        }
      }
    };

    //Run this on ng-click a date
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

      $(function(){
        $('#timeSlider').slider();
        $('#creditFilterSlider').slider({max: 5}).slider("pips",{ rest: 'label'});
      });

      generateDayTabs();
      populateFeedByDate($scope.dayTabs.value);
    };

    init();
  }]);

}


if (Meteor.isServer) {

}
