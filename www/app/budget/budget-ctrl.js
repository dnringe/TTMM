(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['$scope', '$rootScope', 'expenseDataApi'];

    function BudgetCtrl($scope, $rootScope, expenseDataApi) {
        $scope.title = 'Budget';
        $scope.expenseGroupByMonth = '';
        $rootScope.expenses = '';
        activate();

        function activate() {
            expenseDataApi.getExpenseList().then(function(data) {
                $scope.expenseGroupByMonth = _(data.results).chain()
                    .groupBy(function(item){
                        return item.expenseMonth.substring(0,7);
                    })
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(["month", "expenseDetails"], currentItem));
                    })
                    .value();
                    console.log($scope.expenseGroupByMonth);
            });
        }
    }
})();
