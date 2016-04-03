
if (Meteor.isClient) {
  Meteor.subscribe('activityInfo');

  angular.module('KidHubApp')
  .controller('ActivityCtrl', ['$scope','$meteor', '$stateParams', '$state', function($scope, $meteor, $stateParams, $state){
    if ($stateParams.activityId.length === 24) {
      var activityID = new ObjectID($stateParams.activityId);
      $scope.activity = Activities.findOne({_id: activityID});
      $scope.activities = Activities.find().fetch();
      $scope.ageLow = Array.min($scope.activity.ages);
      $scope.ageHigh = Array.max($scope.activity.ages);
      $scope.selectedDate = null;

      $scope.getDates = function(){
        $scope.uniqueDates = {};
        var allTimeslots = null;
        allTimeslots = Timeslots.find({activity_id: activityID}, {sort: {date: 1}}).fetch();
        allTimeslots.forEach(function(elem){
          var eventDate = moment(elem.date).format("dddd, DD MMMM").toString();
          var eventTime = moment(elem.date).format("ha");
          if (!$scope.uniqueDates[eventDate]){
            $scope.uniqueDates[eventDate] = [];
          }
          $scope.uniqueDates[eventDate].push(eventTime);
        });
      };

      $scope.selectDate = function() {
        console.log($scope.selectedDate);
      };

      $scope.selectTime = function(){
        console.log($scope.selectedTime);
      };

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

      $scope.map = {
        center: { latitude: $scope.activity.placeLat, longitude: $scope.activity.placeLong},
        zoom: 17,
        options: { styles: mapbox }
      };

      $scope.marker = {
        events: {
          click: function(marker) {
            console.log (marker);
          }
        }
      };

      //map style

    } else {
      $state.go('home');
    }
  }]);
}


if (Meteor.isServer) {
  Meteor.publish('activityInfo', function(){
    // console.log(Activities);
    return Activities.find({});
  });


}
