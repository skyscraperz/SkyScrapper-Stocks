angular.module('your_app_name').controller('newsCtrl', ['$scope', '$rootScope', '$timeout', '$http','$state', '$ionicPopup', '$ionicLoading', '$ionicModal', 'StockWatchlistService','$ionicSideMenuDelegate',
function ($scope, $rootScope, $timeout, $http,$state , $ionicPopup, $ionicLoading, $ionicModal, StockWatchlistService,$ionicSideMenuDelegate) {
    $scope.$on('$ionicView.enter', function () {
       $scope.items = '';

       $scope.init = function () {
                $ionicLoading.show({
                    template: 'Loading news...'
                });
                var url = "https://www.google.com/finance/company_news?q=" + $rootScope.passData.symbol + "&output=rss&num=40";
                var request = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D%27' + encodeURIComponent(url) + '%27&format=json&diagnostics=true&callback=';
                // after the request is successful
                $http.get(request)
                .then(function (response) {
                    $scope.items = response.data.query.results.item;
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                }, function (error) {
                    $scope.items = ""
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }

            $scope.DisplayDate = function (key) {
                $scope.date = moment(key).format("DD-MM-YYYY hh:mm a");
                return $scope.date;
            }

            $scope.browse = function (v) {
                window.open(v, "_system", "location=yes");
            }

           
              angular.element(document).ready(function () {
                  $scope.init();
            });

    })
}]);