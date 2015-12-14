finzzy.directives.directive('vertilizeContainer', [
    function () {
        return {
            restrict: 'EA',
            controller: [
          '$scope', '$window',
          function ($scope, $window) {
                    // Alias this
                    var _this = this;

                    // Array of children heights
                    _this.childrenHeights = [];

                    // API: Allocate child, return index for tracking.
                    _this.allocateMe = function () {
                        _this.childrenHeights.push(0);
                        return (_this.childrenHeights.length - 1);
                    };

                    // API: Update a child's height
                    _this.updateMyHeight = function (index, height) {
                        _this.childrenHeights[index] = height;
                    };

                    // API: Get tallest height
                    _this.getTallestHeight = function () {
                        var height = 0;
                        for (var i = 0; i < _this.childrenHeights.length; i = i + 1) {
                            height = Math.max(height, _this.childrenHeights[i]);
                        }
                        return height;
                    };

                    // Add window resize to digest cycle
                    angular.element($window).bind('resize', function () {
                        return $scope.$apply();
                    });
          }
        ]
        };
    }
  ]);

finzzy.directives.directive('vertilize', [
    function () {
        return {
            restrict: 'EA',
            require: '^vertilizeContainer',
            link: function (scope, element, attrs, parent) {
                // My index allocation
                var myIndex = parent.allocateMe();

                // Get my real height by cloning so my height is not affected.
                var getMyRealHeight = function () {
                    var clone = element.clone()
                        .removeAttr('vertilize')
                        .css({
                            height: '',
                            width: element.outerWidth(),
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            visibility: 'hidden'
                        });
                    element.after(clone);
                    var realHeight = clone.height();
                    clone['remove']();
                    return realHeight;
                };

                // Watch my height
                scope.$watch(getMyRealHeight, function (myNewHeight) {
                    if (myNewHeight) {
                        parent.updateMyHeight(myIndex, myNewHeight);
                    }
                });

                // Watch for tallest height change
                scope.$watch(parent.getTallestHeight, function (tallestHeight) {
                    if (tallestHeight) {
                        element.css('height', tallestHeight);
                    }
                });
            }
        };
    }
  ]);

finzzy.directives.directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',
        /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});

finzzy.directives.directive('fittext', function () {

    return {
        scope: {
            minFontSize: '@',
            maxFontSize: '@'
        },
        restrict: 'C',
        link: function ($scope, $element, $attrs) {
            var fontSize = $scope.maxFontSize || 50;
            var minFontSize = $scope.minFontSize || 8;

            $element.addClass('textContainer');
            // text container
            var textContainer = $element[0].querySelector('.textContainer');

            angular.element(textContainer).css('word-wrap', 'break-word');

            // max dimensions for text container
            var maxHeight = $element[0].offsetHeight;
            var maxWidth = $element[0].offsetWidth;

            var textContainerHeight;
            var textContainerWidth;

            var resizeText = function () {
                do {
                    // set new font size and determine resulting dimensions
                    textContainer.style.fontSize = fontSize + 'px';
                    textContainerHeight = textContainer.offsetHeight;
                    textContainerWidth = textContainer.offsetWidth;

                    // shrink font size
                    var ratioHeight = Math.floor(textContainerHeight / maxHeight);
                    var ratioWidth = Math.floor(textContainerWidth / maxWidth);
                    var shrinkFactor = ratioHeight > ratioWidth ? ratioHeight : ratioWidth;
                    fontSize -= shrinkFactor;

                } while ((textContainerHeight > maxHeight || textContainerWidth > maxWidth) && fontSize > minFontSize);
            };

            // watch for changes to text
            $scope.$watch('text', function (newText, oldText) {
                if (newText === undefined) return;

                // text was deleted
                if (oldText !== undefined && newText.length < oldText.length) {
                    fontSize = $scope.maxFontSize;
                }
                resizeText();
            });
        }
    };
});