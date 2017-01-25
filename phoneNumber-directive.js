// directive will only allow valid characters for phone numbers into the input
// 0-9 and the symbols _.+() and limits to only a single + character.  Does not do any
// phone number formatting
window.angular.module('directives.phoneNumber', [])
  .directive('phoneNumber', [function () {
    'use strict';
    return {
      restrict: 'CA',
      require : '?ngModel',
      link: function(scope, element, attrs, ngModel) {

        /* called when model is changed from the input element */
        ngModel.$parsers.unshift(function(viewValue) {

          var numbers = viewValue.replace(/[a-zA-Z?=*!@#$%^&,/<>;':"\[\]\\{}|_~`]/g, ''),
            foundPlus = false;

          viewValue = '';

          for (var i = 0; i < numbers.length; i++) {
            if(numbers[i]==='+'){
             if(!foundPlus){
               viewValue += numbers[i];
               foundPlus = true;
             }
            } else {
              viewValue += numbers[i];
            }
          }

          // set the input to formatted value
          element.val(viewValue);

          return viewValue;
        });

        /* called when model is changed outside of the input element */
        ngModel.$formatters.push(function(modelValue) {
          return modelValue;
        });


      }
    };
  }]);
