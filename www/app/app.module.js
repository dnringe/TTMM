(function() {
    'use strict';
    angular
        .module('ttmmApp', ['ionic', 'ttmmApp.core', 'ttmmApp.expense', 'ttmmApp.account'])
        //DSCacheFactory is not CacheFactory
        .run(function($ionicPlatform, CacheFactory) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default
                // (remove this to show the accessory bar above the keyboard for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
                //cache for the offline usage
                CacheFactory("getExpenseListCache", {
                    storageMode: "localStorage",
                    maxAge: 100000,
                    deleteOnExpire: "aggressive"
                });

                CacheFactory("loginUserCache", {
                    storageMode: "localStorage",
                    maxAge: 100000,
                    deleteOnExpire: "aggressive"
                });

                CacheFactory("sessionCache", {
                    storageMode: "localStorage",
                    maxAge: 100000,
                    deleteOnExpire: "aggressive"
                });

                CacheFactory("staticCache", {
                    storageMode: "localStorage"
                });
            });
        })
        .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            $ionicConfigProvider.views.transition('ios');
            $ionicConfigProvider.views.forwardCache(false);
            $ionicConfigProvider.navBar.alignTitle('center');

            // note that you can also chain configs
            $ionicConfigProvider.tabs.position('bottom').style('standard');

            $stateProvider
                .state('welcome', {
                    url: "/welcome",
                    templateUrl: "app/welcome/welcome.html"
                })

            .state('login', {
                    url: "/login",
                    templateUrl: "app/login/login.html"
                })
                .state('tab', {
                    url: "/tab",
                    abstract: true,
                    templateUrl: "app/layout/tabs.html"
                })
                .state('tab.makeExpense', {
                    url: '/makeExpense',
                    views: {
                        'tab-makeExpense': {
                            templateUrl: 'app/expense/make-expense/make-expense.html'
                        }
                    }
                })
                .state('tab.expenses', {
                    url: '/expenses',
                    views: {
                        'tab-expenses': {
                            templateUrl: 'app/expense/expense-list/expense-list.html'
                        }
                    }
                })
                .state('tab.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: 'app/account/account.html'
                        }
                    }
                })
                .state('expense-details', {
                    url: '/expenses/expense-details/:id',
                    templateUrl: 'app/expense/expense-details/expense-details.html'
                })
                .state('newSignUp', {
                    url: '/newSignUp',
                    templateUrl: 'app/sign-up/sign-up.html'
                })
                .state('forgotPassword', {
                    url: '/forgotPassword',
                    templateUrl: 'app/forgot-password/forgot-password.html'
                })
                .state('contactUs', {
                    url: '/contactUs',
                    templateUrl: 'app/contact-us/contact-us.html'
                });
            $urlRouterProvider.otherwise('/welcome');
        });
})();
