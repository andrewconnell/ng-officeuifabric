import * as angular from 'angular';
import {
  ButtonDirective,
  ButtonDescriptionDirective
} from '.';

/**
 * @ngdoc module
 * @name officeuifabric.components.button
 *
 * @description
 * Button module.
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.button', [
  'officeuifabric.components'
])
  .directive('uifButton', ButtonDirective.factory())
  .directive('uifButtonDescription', ButtonDescriptionDirective.factory());
