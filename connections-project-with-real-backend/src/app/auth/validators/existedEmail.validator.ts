import { AbstractControl, ValidatorFn } from '@angular/forms';

export function existedEmailValidator(email: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return control.value === email && control.value !== ''
      ? { existedEmail: true }
      : null;
  };
}
