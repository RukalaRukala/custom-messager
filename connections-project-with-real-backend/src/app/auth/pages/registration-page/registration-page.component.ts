import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lettersDigitsValidator } from '../../validators/letters-digits.validator';
import { upperLowerValidator } from '../../validators/upper-lower.validator';
import { specSymbolsValidator } from '../../validators/spec-symbol.validator';
import { AuthService } from '../../services/auth/auth.service';
import { existedEmailValidator } from '../../validators/existedEmail.validator';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  protected readonly localStorage = localStorage;

  disable = true;

  form!: FormGroup;

  constructor(protected auth: AuthService) {}

  get name() {
    return this.form.get('name');
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit() {
    localStorage.setItem('existedEmail', '');
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[а-яА-Яa-zA-Z\s]+$/),
      ]),
      login: new FormControl('', [
        Validators.email,
        Validators.required,
        existedEmailValidator(localStorage['existedEmail']),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        lettersDigitsValidator(),
        upperLowerValidator(),
        specSymbolsValidator(),
      ]),
    });
    this.form.statusChanges.subscribe(status => {
      this.disable = status === 'INVALID';
    });
  }

  submit(credentials: string[]) {
    this.disable = true;
    if (this.form.valid) {
      this.auth.register(credentials, this.form, this.login);
    }
  }
}
