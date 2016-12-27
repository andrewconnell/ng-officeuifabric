import * as angular from 'angular';

/**
 * @ngdoc interface
 * @name IButtonScope
 * @description
 * Public properties that can set on the button directive.
 *
 * @export
 * @interface IButtonScope
 * @extends {angular.IScope}
 */
export interface IButtonScope extends angular.IScope {
  disabled: boolean;
  uifType: string;
}
