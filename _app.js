// Users = new Mongo.Collection('users');
Activities = new Mongo.Collection('activities');

if (Meteor.isClient) {
    angular.module('KidHubApp', ['angular-meteor', 'accounts.ui', 'ui.router']);

    angular.module('KidHubApp').config(function($urlRouterProvider, $stateProvider, $locationProvider){
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('welcome',{
          url: '/',
          templateUrl: 'welcome.html',
          controller: 'WelcomeCtrl',
          authenticate: false
        })
        .state('home',{
          url: '/home',
          templateUrl: 'home.html',
          controller: 'HomeCtrl',
          authenticate: true
        })
        .state('activity',{
          url: '/activities/:activityId',
          templateUrl: 'activity.html',
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


}

Meteor.methods({

});

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('products', function(){

  });

}