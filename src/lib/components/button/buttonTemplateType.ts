/**
 * @ngdoc enum
 * @name ButtonTemplateType
 * @description
 * Enum for all possible button template types. This is not intended to be used outside of the directive.
 * It is used internally to determine the template to use.
 *
 * @enum {string}
 *
 * @docs-private
 */
export enum ButtonTemplateType {
  actionButton,
  actionLink,
  primaryButton,
  primaryLink,
  commandButton,
  commandLink,
  compoundButton,
  compoundLink,
  heroButton,
  heroLink
};
