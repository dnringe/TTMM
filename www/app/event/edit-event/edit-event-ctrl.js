(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('EditEventCtrl', EditEventCtrl);

    EditEventCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', '$ionicPopup', 'eventsDataApi'];

    function EditEventCtrl($scope, $state, $stateParams, $rootScope, $ionicPopup, eventsDataApi) {

        $scope.eventDetails = '';
        $scope.eventId = '';

        ////////////////

        $scope.eventId = $stateParams.id;
        console.log("From Edit EventCtrl=", $scope.eventId);

        eventsDataApi.getEventList().then(function(data) {
            $scope.eventDetails = _(data.results).chain()
                .find({
                    'objectId': $scope.eventId
                })
                .pick('eventName', 'eventDescription', 'createdAt', 'photo', 'budgetAmount', 'endDate', 'eventContributors')
                .value();
        });

        $scope.editEvent = function(event) {
            console.log("editEvent is called");

            eventsDataApi.editEvent($scope.eventId, {
                eventName: $scope.eventDetails.eventName,
                eventDescription: $scope.eventDetails.eventDescription,
                budgetAmount: $scope.eventDetails.budgetAmount
            }).then(function() {
                eventsDataApi.getEventList().then(function(data) {
                    $rootScope.events = data.results;
                    $state.go('tab.events');

                    //console.log("Event List =", $rootScope.events);
                });

            });
        }


        // A confirm dialog
        $scope.removeEvent = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete this event',
                template: 'Are you sure you want to delete this event?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    eventsDataApi.removeEvent($scope.eventId).then(function() {
                        eventsDataApi.getEventList().then(function(data) {
                            $rootScope.events = data.results;
                            console.log("Data list=" + $rootScope.events);
                            $state.go('tab.events');
                            console.log("Item is removed");
                        });
                    });

                } else {
                    console.log('You are not sure');
                }
            });
        };

    }
})();
