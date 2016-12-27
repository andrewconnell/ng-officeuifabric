import * as angular from 'angular';

/**
 * @ngdoc interface
 * @name IButtonAttributes
 * @description
 * Public attributes used on the button directive. Don't use this, use the scope `IButtonScope` instead.
 *
 * @export
 * @interface IButtonAttributes
 * @extends {angular.IScope}
 */
export interface IButtonAttributes extends angular.IAttributes {
  uifType: string;
  ngHref: string;
  disabled: string;
}
