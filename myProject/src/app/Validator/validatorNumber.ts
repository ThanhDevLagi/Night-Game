import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isNumeric = /^\d+$/.test(value);
    return isNumeric ? null : { nonNumeric: true };
  };
}
