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

  angular.module('KidHubApp', ['angular-meteor', 'accounts.ui', 'ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps']);

  angular.module('KidHubApp').config(function($urlRouterProvider, $stateProvider, $locationProvider){
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
      });

    $urlRouterProvider.otherwise('/');
  });

  function resizeDiv() {
    vpw = $(window).width();
    vph = $(window).height();
    $('body').css({'height': vph + 'px'});
    console.log("vph=", vph);
  }

  function onReady(){
    angular.bootstrap(document, ['KidHubApp']);
    resizeDiv();
  }

  window.onresize = function(event) {
    resizeDiv();
  };

  angular.element(document).ready(onReady);
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
      for (var i = 0; i < 8; i++){
        var date = faker.date.between(currentdate, enddate);
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
          endTime: moment(date).add(60, 'm'),
          imageURL: activity.imageURL
        });
      }
    });
    console.log('creating timeslots.');
  }

  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('activities', function(){
    // return queries that are called from client.
  });

}