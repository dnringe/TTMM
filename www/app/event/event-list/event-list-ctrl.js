(function() {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("EventListCtrl", EventListCtrl);
    EventListCtrl.$inject = ['$rootScope', 'eventsDataApi'];

    function EventListCtrl($rootScope, eventsDataApi) {

        activate();

        function activate() {
            eventsDataApi.getEventList().then(function(data) {
                $rootScope.events = data.results;
            });
        }
    }
})();
