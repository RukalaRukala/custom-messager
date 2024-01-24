import { AbstractControl, ValidatorFn } from '@angular/forms';

export function upperLowerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const lowersRgEx = /[a-zёа-я]+/;
    const upperRgEx = /[A-ZЁА-Я]+/;
    const valid =
      !control.value ||
      (upperRgEx.test(control.value) && lowersRgEx.test(control.value));
    return valid ? null : { upperLower: true };
  };
}
