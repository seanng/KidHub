if (Meteor.isClient) {
  angular.module('KidHubApp').directive("feed", function() {
    return {
      templateUrl: "partials/feed.html"
    };
  });

  angular.module('KidHubApp').directive("navbar", function() {
    return {
      templateUrl: "partials/navbar.html",
      controller: "NavbarCtrl"
    };
  });
  angular.module('KidHubApp').directive("signinmodal", function() {
    return {
      templateUrl: "partials/signinmodal.html",
      controller: "SigninCtrl"
    };
  });
  angular.module('KidHubApp').directive("topupmodal", function() {
    return {
      templateUrl: "partials/topupmodal.html",
      controller: "TopupCtrl"
    };
  });
}