// Ionic Starter App

angular.module('underscore', [])
.factory('_', function () {
    return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
  'ionic',
  'angularMoment',
  'your_app_name.controllers',
  'your_app_name.directives',
  'your_app_name.filters',
  'your_app_name.services',
  'your_app_name.factories',
  'your_app_name.config',
  'angucomplete-alt',
  'underscore',
  'ngResource',
  'ngCordova',
  'slugifier'
])

.run(function ($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $timeout) {

    $ionicPlatform.on("deviceready", function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        //PushNotificationsService.register();
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                    title: "Internet Disconnected",
                    content: "The internet is disconnected on your device."
                })
                .then(function (result) {
                    if (!result) {
                        ionic.Platform.exitApp();
                    }
                    else {

                    }
                });
            }
        }

        sqliteHelper.OpenDB();
        sqliteHelper.CreateTblUserInfo();
        sqliteHelper.CreateTblCompanyDetails();

        var admobid = {};

        // TODO: replace the following ad units with your own
        if (/(android)/i.test(navigator.userAgent)) {
            admobid = { // for Android
                banner: 'ca-app-pub-9366018495614953/7552226826',
                interstitial: 'ca-app-pub-9366018495614953/9028960024'
            };
        } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-2459705473085658/5179554124',
                interstitial: 'ca-app-pub-2459705473085658~3702820924'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-6869992474017983/8878394753',
                interstitial: 'ca-app-pub-6869992474017983/1355127956'
            };
        }

        function createSelectedBanner() {
            if (AdMob) AdMob.createBanner({
                adId: admobid.banner,
                overlap: false,
                offsetTopBar: false,
                adSize: 'SMART_BANNER',
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
            });
        }

        function initApp() {
            if (!AdMob) {
                //alert('admob plugin not ready');
                return;
            }

            createSelectedBanner();
            // this will create a banner on startup
            if (AdMob) AdMob.createBanner(admobid.banner);

            AdMob.createBanner({
                adId: admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                // isTesting: true, // TODO: remove this line when release
                overlap: false,
                offsetTopBar: false,
                bgColor: 'black'
            });

            // this will load a full screen ad on startup
            AdMob.prepareInterstitial({
                adId: admobid.interstitial,
                // isTesting: true, // TODO: remove this line when release
                autoShow: true
            });

        }
        $(document).on('resume', function () {
            AdMob.showInterstitial();
        });

        if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', initApp, false);
        } else {
            initApp();
        }
    })

    // This fixes transitions for transparent background views
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf('auth.walkthrough') > -1) {
            // set transitions to android to avoid weird visual effect in the walkthrough transitions
            $timeout(function () {
                //$ionicConfig.views.transition('android');
                $ionicConfig.views.transition('none');//transition is set to none.
                $ionicConfig.views.swipeBackEnabled(false);
                console.log("setting transition to android and disabling swipe back");
            }, 0);
        }
    });
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf('app.watchlist') > -1) {
            // Restore platform default transition. We are just hardcoding android transitions to auth views.
            //$ionicConfig.views.transition('platform');
            $ionicConfig.views.transition('none');//transition is set to none.
            // If it's ios, then enable swipe back again
            if (ionic.Platform.isIOS()) {
                $ionicConfig.views.swipeBackEnabled(true);
            }
            console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
        }
    });

    $ionicPlatform.on("resume", function () {
        //PushNotificationsService.register();
    });

})

.run(function ($ionicPlatform, $ionicPopup) {
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function (event) {
        if (true) { // your check here
            $ionicPopup.confirm({
                title: 'System warning',
                template: 'are you sure you want to exit?'
            }).then(function (res) {
                if (res) {
                    ionic.Platform.exitApp();
                }
            })
        }
    }, 100);
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

    //INTRO
    .state('auth', {
        url: "/auth",
        templateUrl: "views/auth/auth.html",
        abstract: true,
        controller: 'AuthCtrl'
    })

     .state('auth.slider', {
         url: '/slider',
         templateUrl: "views/app/layouts/slider.html",
         controller: "introCtrl"
     })

    .state('auth.login', {
        url: '/login',
        templateUrl: "views/auth/login.html",
        controller: 'LoginCtrl'
    })

    .state('auth.signup', {
        url: '/signup',
        templateUrl: "views/auth/signup.html",
        controller: 'SignupCtrl'
    })

    .state('auth.forgot-password', {
        url: "/forgot-password",
        templateUrl: "views/auth/forgot-password.html",
        controller: 'ForgotPasswordCtrl'
    })

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "views/app/side-menu.html",
        controller: 'AppCtrl'
    })

    //stocks

    .state('app.watchlist', {
        url: "/watchlist",
        views: {
            'menuContent': {
                templateUrl: "views/app/stocks/stockWatchlist.html",
                controller: 'stockWatchlistCtrl'
            }
        }
    })

     .state('app.equityoption', {
         url: "/equityoption",
         views: {
             'menuContent': {
                 templateUrl: "views/app/stocks/equityOptions.html",
                 controller: 'equityOptionCtrl'
             }
         }
     })

.state('app.news', {
    url: "/news",
    views: {
        'menuContent': {
            templateUrl: "views/app/stocks/news.html",
            controller: 'newsCtrl'
        }
    }
})

    .state('app.profile', {
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: "views/app/profile.html"
            }
        }
    })

    .state('app.bookmarks', {
        url: "/bookmarks",
        views: {
            'menuContent': {
                templateUrl: "views/app/bookmarks.html",
                controller: 'BookMarksCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/auth/slider');
});
