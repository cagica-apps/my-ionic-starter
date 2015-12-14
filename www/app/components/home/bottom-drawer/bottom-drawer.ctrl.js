finzzy.controllers.controller('BottomDrawerCtrl', function($scope, $window, TransferOptions, PaymentOptions, CustomOptions) {
    $scope.transferOptions = TransferOptions.all();
    $scope.paymentOptions = PaymentOptions.all();
    $scope.customOptions = CustomOptions.all();
    
    $scope.transferScrollWidth = ($window.innerWidth / 3) * $scope.transferOptions.length;
    $scope.paymentScrollWidth = ($window.innerWidth / 3) * $scope.paymentOptions.length;
    $scope.customScrollWidth = ($window.innerWidth / 3) * $scope.customOptions.length;
});