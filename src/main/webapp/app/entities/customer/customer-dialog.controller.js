(function() {
    'use strict';

    angular
        .module('mccrmApp')
        .controller('CustomerDialogController', CustomerDialogController);

    CustomerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Customer', 'Lre', 'CustomerAddres', 'CustomerContact'];

    function CustomerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Customer, Lre, CustomerAddres, CustomerContact) {
        var vm = this;

        vm.customer = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.lres = Lre.query();
        vm.customeraddres = CustomerAddres.query();
        vm.customercontacts = CustomerContact.query();
        // vm.customers = Customer.query();
        vm.customers = Customer.queryWithoutCurrent({id: vm.customer.id});

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.customer.id !== null) {
                Customer.update(vm.customer, onSaveSuccess, onSaveError);
            } else {
                Customer.save(vm.customer, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('mccrmApp:customerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.creationDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
