/**
 * @ngdoc enum
 * @name ButtonType
 * @description
 * Enum for all possible button types supported by Office UI Fabric. Enums in JavaScript are always indexed but this enum is
 * intended to be used as a striangular.
 *
 * @enum {string}
 *
 * @usage
 * This is used to generate the string that you pass into the `<uif-button />` directive. Specifically, the string is passed
 * to the `uif-type` attribute. To evaluate the enum value as a string:
 *
 * ```typescript
 * let buttonType: string = ButtonType[ButtonType.primary];
 * ```
 */
export enum ButtonType {
  /**
   * Normal button but adds the primary color (blue) as button color.
   */
  primary,
  /**
   * Removes the retangular button look replacing more like a link with optional icon in the label.
   */
  command,
  /**
   * Bigger button that includes a label with optional description on 2nd line below label.
   */
  compound,
  /**
   * Big button without the rectangular button look and an optional icon in the label.
   */
  hero
};
