var paymentAmount = null;

if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('TopupCtrl', ['$scope','$meteor', '$location', '$timeout', function($scope, $meteor, $timeout, $location){

    $scope.progressvalue = 33;

    $scope.highlightTokenMessage = false;
    paymentAmount = $scope.paymentOption;

  // on modal close
    $scope.closeModal = function() {
      $('#topup-modal').modal('toggle');
    };

    $('#topup-modal').on('hidden.bs.modal', function(e){
      $scope.progressvalue = 33;
      $scope.$apply();
      for (var key in $scope.cardDetails) {
        $scope.cardDetails[key] = '';
      }
      $scope.paymentOption = null;
      $scope.highlightTokenMessage = false;
    });

    $scope.modalTitle = "Choose your payment plan";

    $scope.nextAction = function(){
      if ($scope.paymentOption){
        paymentAmount = $scope.paymentOption;
        payButton();
        $('#topup-modal').modal('toggle');
      } else {
        $scope.highlightTokenMessage = true;
      }
    };

    $scope.plans = Meteor.settings.public.plans;

    //Step 2
    $scope.cardDetails = {
      number: '',
      cvc: '',
      expMonth: '',
      expYear: ''
    };

    var payButton = function() {
      StripeCheckout.open({
        key: Meteor.settings.public.stripe.testPublishableKey,
        amount: paymentAmount,
        name: 'Token Payment',
        description: '',
        panelLabel: 'Pay Now',
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          Meteor.call('chargeCard', stripeToken);
        }
      });
    };

  }]);
}

if (Meteor.isServer) {
  Meteor.methods({
    'chargeCard': function(stripeToken){
      check(stripeToken, String);
      var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);

      Stripe.charges.create({
        source: stripeToken,
        amount: paymentAmount,
        currency: 'hkd'
      }, function(err, charge){
        console.log(err, charge);
      });
    }
  });
}