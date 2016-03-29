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
  angular.module('KidHubApp', ['angular-meteor', 'accounts.ui', 'ui.router', 'ui.bootstrap']);

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

  function onReady(){
    angular.bootstrap(document, ['KidHubApp']);
  }

  angular.element(document).ready(onReady);
}

Meteor.methods({

});

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('activities', function(){
    // return queries that are called from client.
  });

}