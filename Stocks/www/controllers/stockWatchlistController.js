angular.module('your_app_name').controller('stockWatchlistCtrl', ['$scope', '$rootScope', '$timeout', '$http','$state', '$ionicPopup', '$ionicLoading', '$ionicModal', 'StockWatchlistService','$ionicSideMenuDelegate',
function ($scope, $rootScope, $timeout, $http,$state , $ionicPopup, $ionicLoading, $ionicModal, StockWatchlistService,$ionicSideMenuDelegate) {
    $scope.$on('$ionicView.enter', function () {
       $scope.Symbols = [];
       $ionicSideMenuDelegate.canDragContent(false);
        $scope.addSymbol = function (symbol) {
            if (symbol.title != null && symbol.title != undefined && typeof (symbol.title) != 'undefined' && symbol.title != "") {
            $ionicLoading.show({
                template: 'Loading Stocks...'
            });
            StockWatchlistService.AddSymbol(symbol.title, function (data) {
                if (data == true) {
                $scope.loadSymbols();
                $ionicLoading.hide();
                $scope.$broadcast('angucomplete-alt:clearInput');
                }
                else{
                    $ionicLoading.hide();
                    $scope.$broadcast('angucomplete-alt:clearInput');
                }
            }, function () {
                $scope.$broadcast('angucomplete-alt:clearInput');
                $ionicLoading.hide();
            })
        }
        else{
             $scope.$broadcast('angucomplete-alt:clearInput');
             $ionicLoading.hide();
            }
        }

        $scope.loadSymbols = function () {
            $ionicLoading.show({
                template: 'Loading Stocks...'
            });
            setTimeout(function () {
                //sqllite operations for get data form CompanyDetails.
                sqliteHelper.GetFromCompanyDetails(function (data) {
                    if (data != null || data != undefined || data != '') {
                        //window.prompt("", JSON.stringify(data))
                        $scope.items = data
                        $scope.$apply()
                        $ionicLoading.hide();
                    }
                }, function (error) {
                    $scope.items = '';
                    $scope.message = "No data found!"
                    $ionicLoading.hide();
                });
            }, 1000);
        }

        $scope.doRefresh = function () {
            $ionicLoading.show({
                template: 'Loading Stocks...'
            });
            StockWatchlistService.getallSymbol(function (data) {
                if (data == true) {
                    $scope.loadSymbols();
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    //  $ionicLoading.show({ template: 'Refreshed!', noBackdrop: true, duration: 1000 });
                }
                else {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                }
            }, function () {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                //$ionicLoading.show({ template: 'Could not Refresh!', noBackdrop: true, duration: 1000 });
            })
        }

        $scope.onItemDelete = function (item) {
            sqliteHelper.DeleteSymbol(item)
            $scope.loadSymbols();
        }

         $scope.symbollookup = function (userInputString, timeoutPromise) {
           return $http.get('http://d.yimg.com/aq/autoc?query=' + userInputString + '&region=US&lang=en-US&callback=', {}, { timeout: timeoutPromise });
        }
        
         $scope.selected = function (item) {
            $rootScope.passData = item;
            $state.go('app.equityoption');
        }
        
        angular.element(document).ready(function () {
                $scope.doRefresh();
        });
    })
}]);