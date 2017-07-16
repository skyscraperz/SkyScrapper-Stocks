(function () {
    'use strict';

    //#region "StockWatchlistService declaration"
    angular
        .module('your_app_name')
        .service('StockWatchlistService', ['$http', '$rootScope',
              StockWatchlistService]);

    //#endregion

    function StockWatchlistService($http, $rootScope) {

        //#region Private declaration of service
        var localVars = {
            myUrl: '',
        };
        //#endregion

        //#region "Constructor"
        var service = {
            reqParams: {},
            AddSymbol: AddSymbol,
            getallSymbol: getallSymbol
        };
        return service;
        //#endregion

        //add Symbol to db
        function AddSymbol(symbol, onSuccess, onError) {
            if (symbol != undefined || symbol != null) {
                var strSymbol = symbol.toUpperCase();
                var dataFlag;
                $http.get('http://finance.google.com/finance/info?client=ig&q=' + strSymbol)
                    .success(function (data, status, headers, config) {
                        dataFlag = true;
                        var symbolData = data;
                        symbolData = symbolData.replace("//", "");
                        sqliteHelper.InsertCompanyDetails(symbolData);
                        onSuccess(dataFlag);
                    })
                    .error(function (data, status, header, config) {
                        dataFlag = false;
                        onError(dataFlag);
                    });
            }
        }

        function getallSymbol(onSuccess, onError) {
            sqliteHelper.ConcateSymbol(function (Info) {
                if (Info != null && Info != '' && Info != "") {
                    var Symbols = Info.toUpperCase();
                    var flag;
                    var query = 'http://finance.google.com/finance/info?client=ig&q=' + Symbols;
                    $http.get(query)
                    .then(function success(response) {
                        var symbolData = response.data;
                        flag = true;
                        symbolData = symbolData.replace("//", "");
                        sqliteHelper.InsertCompanyDetails(symbolData);
                        onSuccess(flag);
                    },
                        function error(response) {
                            var data = response.data;
                            flag = false;
                            onError(flag);
                        })
                }
                else {
                    //todo
                }
            }, function (error) {
                onError(error);
            })
        }
    }
})();