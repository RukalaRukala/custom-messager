import { AbstractControl, ValidatorFn } from '@angular/forms';

export function specSymbolsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const symbolsRgEx = /[!@\]#?]+/;
    const valid = !control.value || symbolsRgEx.test(control.value);
    return valid ? null : { specSymbols: true };
  };
}
