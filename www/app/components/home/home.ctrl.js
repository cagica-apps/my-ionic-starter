finzzy.controllers.controller('HomeCtrl', function ($scope, $rootScope, $window, $timeout, $ionDrawerVerticalDelegate) {

    $timeout(function () {
        $scope.bottomDrawerMargin = $window.innerHeight * 0.20;
        console.log($window.innerHeight * 0.20);
    });

    $scope.toggleTopDrawer = function () {
        $ionDrawerVerticalDelegate.$getByHandle('top-drawer').toggleDrawer();
    };
    $scope.toggleBottomDrawer = function () {
        $ionDrawerVerticalDelegate.$getByHandle('bottom-drawer').toggleDrawer();
    };

    var cards = {
        top: [{
            template: 'app/components/uments/templates/ument-type-1.html'
        }],
        middle: [{
            template: 'app/components/uments/templates/ument-type-3.html'
        }],
        bottom: [{
            template: 'app/components/uments/templates/ument-type-2.html'
        }]
    };

    $scope.cardsTop = [];
    $scope.cardsMiddle = [];
    $scope.cardsBottom = [];

    $scope.cardIndex = {
        top: 0,
        middle: 0,
        bottom: 0
    };

    var ready = {
        top: true,
        middle: true,
        bottom: true
    };

    //tinder cards emit created card event, to check if card is loaded preventing double cards
    $rootScope.$on('cardCreated', function (event, data) {
        switch (data.slot) {
        case 'top':
            ready.top = true;
            break;
        case 'middle':
            ready.middle = true;
            break;
        case 'bottom':
            ready.bottom = true;
            break;
        }
    });

    $scope.cardDestroyed = function (cardArray, cardSlot, index) {
        console.log('cardDestroyed', ready, cardSlot, cardArray);
        if (ready[cardSlot]) {
            cardArray.splice(index, 1);
            ready[cardSlot] = false;
            $timeout(function () {
                $scope.addCard(cardArray, cardSlot);
            }, 600);
        }
    };

    $scope.addCard = function (cardArray, cardSlot) {
        console.log(cardArray);
        $scope.cardIndex[cardSlot] = ($scope.cardIndex[cardSlot] + 1) % cards[cardSlot].length;
        var newCard = cards[cardSlot][$scope.cardIndex[cardSlot]];
        newCard.id = Math.random();
        newCard.slow = true;
        cardArray.push(newCard);
        console.log(cardArray);
    };

    $scope.addCard($scope.cardsTop, 'top');
    $scope.addCard($scope.cardsMiddle, 'middle');
    $scope.addCard($scope.cardsBottom, 'bottom');
});