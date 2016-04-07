var paymentAmount = null;

if (Meteor.isClient) {
  angular.module('KidHubApp')
  .controller('TopupCtrl', ['$scope','$meteor', '$location', '$timeout', function($scope, $meteor, $location, $timeout){

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

    $scope.cardDetails = {
      number: '',
      cvc: '',
      expMonth: '',
      expYear: ''
    };

    $scope.checkpaymentOption = function(){
      console.log($scope.paymentOption);
    };

    var payButton = function() {
      StripeCheckout.open({
        key: Meteor.settings.public.stripe.testPublishableKey,
        amount: paymentAmount,
        name: 'Purchase Coins',
        description: '',
        closed: function(){
          if (paymentAmount == 50000){
            Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.tokens': Meteor.user().profile.tokens += 5}});
            window.location.href='/home';
          } else if (paymentAmount == 95000){
            Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.tokens': Meteor.user().profile.tokens += 10}});
            window.location.href='/home';
          } else if (paymentAmount == 185000){
            Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.tokens': Meteor.user().profile.tokens += 20}});
            window.location.href='/home';
          }
        },
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