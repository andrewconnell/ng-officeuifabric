import * as angular from 'angular';

/**
 * @ngdoc interface
 * @name IButtonScope
 * @description
 * Public properties that can set on the button directive.
 *
 * @interface IButtonScope
 * @extends {angular.IScope}
 * @docs-reference {ButtonType}
 */
export interface IButtonScope extends angular.IScope {
  /**
   * Flag indicating if the button should be disabled or not. The directive also
   * supports the attribute `ng-disabled`.
   */
  disabled?: boolean;
  /**
   * The type of the button to be rendered. If not specified, a normal button is rendered.
   * This is specified using the `uif-type` attribute on the directive. While listed as a string,
   * the real type is a <code>ButtonType</code>.
   */
  uifType?: string;
}
