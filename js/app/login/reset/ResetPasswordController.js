/* global angular:false */

angular
.module('ndslabs')
/**
 * The controller for our "Reset Password" View
 * 
 * @author lambert8
 * @see https://opensource.ncsa.illinois.edu/confluence/display/~lambert8/3.%29+Controllers%2C+Scopes%2C+and+Partial+Views
 */
.controller('ResetPasswordController', [ '$scope', '$location', '$cookies', '$routeParams', '$log', 'HomeRoute', 'NdsLabsApi', function($scope, $location, $cookies, $routeParams, $log, HomeRoute, NdsLabsApi) {
  $scope.token = $routeParams.t;
  
  if ($scope.token) {
    $cookies.put('token', $scope.token);
  }
  
  $scope.resetSendSuccessful = false;
  $scope.resetSuccessful = false;
  
  $scope.newPassword = {
    username: '',
    password: '',
    confirmation: ''
  };
  
  /**
   * Send a reset link to the e-mail associated with the given accountId (username / namespace)
   */
  $scope.sendResetLink = function() {
    NdsLabsApi.postResetByAccountId({ accountId: $scope.newPassword.username }).then(function(data) {
      console.debug(data);
      $scope.resetSendSuccessful = true;
    }, function(response) {
      $log.error("Failed to send password reset link");
      console.debug(response);
    })
  };
  
  /**
   * Reset the password of the account associated with the token attached to the request headers
   */
  $scope.resetPassword = function() {
    NdsLabsApi.putChangePassword({ password: { password: $scope.newPassword.password } }).then(function(data) {
      console.debug(data);
      $scope.resetSuccessful = true;
    }, function(response) {
      $log.error("Failed to reset password");
      console.debug(response);
    })
  };
}]);
