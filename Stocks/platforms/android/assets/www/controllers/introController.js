
angular.module('your_app_name').controller('introCtrl', ['$scope', '$rootScope', '$timeout','$interval', '$http','$ionicSideMenuDelegate','$ionicSlideBoxDelegate',
function ($scope, $rootScope, $timeout,$interval, $http,$ionicSideMenuDelegate,$ionicSlideBoxDelegate) {
    $scope.$on('$ionicView.enter', function () {
     $scope.startApp = function() {
    $state.go('app.watchlist');
  };
  // Called each time the slide changes
  // $scope.slideChanged = function(index) {
  //   $scope.slideIndex = index;
  // };

//   var current_image = 1;
//         var max_images = 5;

//         $interval(function () {
//             jQuery('.bg-image .img').addClass('fadeOut');
//             if (current_image == max_images) {
//                 current_image = 1;
//             } else {
//                 current_image += 1;
//             }
//             jQuery('.bg-image').css('background-image', jQuery('.bg-image .img').css('backgroundImage'));
//             $timeout(function () {
//                 var img = jQuery('.bg-image .img').css('backgroundImage', 'url(../img/backgrounds/' + current_image + ".jpg)");
//                 img.removeClass('fadeOut');
//             }, 500);

//         }, 2000);
 })
}])