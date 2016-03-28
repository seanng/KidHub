// Users = new Mongo.Collection('users');
Activities = new Mongo.Collection('activities');

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
          // url: '/activity',
          url: '/activities/:activityId',
          templateUrl: 'views/activity.html',
          controller: 'ActivityCtrl',
          authenticate: true
        });

      $urlRouterProvider.otherwise('/');
    });



    // angular.module('KidHubApp').run(function($rootScope, $state){
    //   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
    //     $rootScope.currentUserId = Meteor.userId();
    //   });
    // });


    function onReady(){
      angular.bootstrap(document, ['KidHubApp']);
    }

    angular.element(document).ready(onReady);

    angular.module('KidHubApp').directive("navbar", function() {
      return {
          templateUrl: "partials/navbar.html"
      };
    });

    angular.module('KidHubApp').directive("signinmodal", function() {
      return {
          templateUrl: "partials/signinmodal.html"
      };
    });
    angular.module('KidHubApp').directive("topupmodal", function() {
      return {
          templateUrl: "partials/topupmodal.html"
      };
    });


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