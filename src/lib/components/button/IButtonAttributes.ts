import * as angular from 'angular';

/**
 * @ngdoc interface
 * @name IButtonAttributes
 * @description
 * Public attributes used on the button directive. Don't use this, use the scope `IButtonScope` instead.
 *
 * @interface IButtonAttributes
 * @extends {angular.IAttributes}
 */
export interface IButtonAttributes extends angular.IAttributes {
  uifType: string;
  ngHref: string;
  disabled: string;
}
