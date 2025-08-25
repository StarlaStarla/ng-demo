import { Directive, input } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector: '[appForbiddenName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }],
})
export class ForbiddenValidatorDirective implements Validator {
  forbiddenName = input<string>('', { alias: 'appForbiddenName' });
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName
      ? forbiddenNameValidator(new RegExp(this.forbiddenName(), 'i'))(control)
      : null;
  }
}

/** An actor's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}