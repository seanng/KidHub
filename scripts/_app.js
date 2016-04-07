// Users = new Mongo.Collection('users');
Activities = new Mongo.Collection('activities', {idGeneration: 'MONGO'});
Timeslots = new Mongo.Collection('timeslots', {idGeneration: 'MONGO'});
ObjectID = Meteor.Collection.ObjectID;

Array.min = function( array ){
  return Math.min.apply( Math, array );
};
Array.max = function( array ){
  return Math.max.apply( Math, array );
};

if (Meteor.isClient) {

  Meteor.startup(function () {
    var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey(stripeKey);

    STRIPE = {
      getToken: function (domElement, card, callback) {
        Stripe.card.createToken(card, function(status,response){
          if (response.error){
            Bert.alert( response.error.message, "danger");
          } else {
            STRIPE.setToken(response.id, domElement, callback);
          }
        });
      },
      setToken: function(token, domElement, callback) {
        $(domElement).append($('<input type="hidden" name="stripeToken" />').val(token));
      }
    };
  });

  angular.module('KidHubApp', ['angular-meteor', 'accounts.ui', 'ui.router', 'ui.bootstrap', 'ngMaterial', 'uiGmapgoogle-maps']);

  angular.module('KidHubApp').filter('unique', function() {
     return function (items, filterOn) {
      if (filterOn === false) {
        return items;
      }

      if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
        var hashCheck = {}, newItems = [];

        var extractValueToCompare = function (item) {
          if (angular.isObject(item) && angular.isString(filterOn)) {
            return item[filterOn];
          } else {
            return item;
          }
        };

        angular.forEach(items, function (item) {
          var valueToCheck, isDuplicate = false;

          for (var i = 0; i < newItems.length; i++) {
            if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            newItems.push(item);
          }

        });
        items = newItems;
      }
      return items;
    };
  });

  angular.module('KidHubApp').filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });

  angular.module('KidHubApp').config(function($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('welcome',{
        url: '/',
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl',
        authenticate: false
      })
      .state('home',{
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        authenticate: true
      })
      .state('activity',{
        url: '/activities/:activityId',
        templateUrl: 'views/activity.html',
        controller: 'ActivityCtrl',
        authenticate: true
      })
      .state('profile',{
        url: '/user/:userId',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true
      })
      .state('userinfo',{
        url: '/user/info/:userId',
        templateUrl: 'views/userinfo.html',
        controller: 'UserInfoCtrl',
        authenticate: true
      });

    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('lime')
      .primaryPalette('lime')
      .accentPalette('orange')
      .warnPalette('blue');

    $mdThemingProvider.alwaysWatchTheme(true);

  });
}

Meteor.methods({

});

if (Meteor.isServer) {
  //fake data
  var allActivities = Activities.find( {}).fetch();

  var currentdate = new Date();
  var enddate = moment().add(14, 'd');

  var allTimeslots = Timeslots.find({}).fetch();
  if (allTimeslots.length <= 24) {
    var activities = Activities.find({}).fetch();
    activities.forEach(function(activity){
      for (var i = 0; i < 12; i++){
        var date = faker.date.between(currentdate, enddate);
        var arrHours = [9,10,11,12,13,14,15,16,17,18];
        var hour = arrHours[Math.floor(Math.random()*arrHours.length)];
        date.setHours(hour, 0,0,0);
        console.log(date);
        Timeslots.insert({
          name: activity.name,
          activity_id: activity._id,
          ages: activity.ages,
          district: activity.district,
          category: activity.category,
          tokens: activity.tokens,
          placeLat: activity.placeLat,
          placeLong: activity.placeLong,
          date: date,
          imageURL: activity.imageURL,
          registrations: []
        });
      }
    });
    console.log('creating timeslots.');
  }

  Meteor.publish('activities', function(){
    // return queries that are called from client.
  });

}