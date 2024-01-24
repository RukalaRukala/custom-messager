import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lettersDigitsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const lettersRgEx = /[a-zA-ZёЁа-яА-Я]+/;
    const digitsRgEx = /[0-9]+/;
    const valid =
      !control.value ||
      (lettersRgEx.test(control.value) && digitsRgEx.test(control.value));
    return valid ? null : { lettersDigits: true };
  };
}
