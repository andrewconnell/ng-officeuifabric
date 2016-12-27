import * as angular from 'angular';

/**
 * @ngdoc directive
 * @name ButtonDescription
 * @module officeuifabric.components.button
 *
 * @restrict E
 *
 * @description
 * `<uif-button-description>` is a button description directive.
 *
 * @see {@link Button} for parent directive
 *
 * @usage
 *
 * ```html
 * <uif-button-description>Lorem Ipsum</uif-button-description>
 * ```
 *
 * @docs-private
 */
export class ButtonDescriptionDirective implements angular.IDirective {

  public restrict: string = 'E';
  public require: string = '^uifButton';
  public transclude: boolean = true;
  public replace: boolean = true;
  public scope: boolean = false;
  public template: string = '<span class="ms-Button-description" ng-transclude></span>';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new ButtonDescriptionDirective();
    return directive;
  }

}
