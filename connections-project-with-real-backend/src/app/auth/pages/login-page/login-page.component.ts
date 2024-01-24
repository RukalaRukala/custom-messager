import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lettersDigitsValidator } from '../../validators/letters-digits.validator';
import { upperLowerValidator } from '../../validators/upper-lower.validator';
import { specSymbolsValidator } from '../../validators/spec-symbol.validator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  protected readonly localStorage = localStorage;

  disable = true;

  form!: FormGroup;

  constructor(private auth: AuthService) {}

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.email, Validators.required]),
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
    if (this.form.valid) {
      this.disable = true;
      this.auth.login(credentials, this.form);
    }
  }
}
