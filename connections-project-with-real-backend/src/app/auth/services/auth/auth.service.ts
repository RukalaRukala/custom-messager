import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ICredentials, IProfileResponse } from '../../auth.model';
import { ApiService } from '../../../services/api.service';
import { catchError, map } from 'rxjs';
import { ToastService } from '../../../shared/components/toast messages/toast.service';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { existedEmailValidator } from '../../validators/existedEmail.validator';
import { QueryService } from '../../../chat/services/query.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private api: ApiService,
    private toastService: ToastService,
    private queryService: QueryService
  ) {}

  register(
    [name, email, password]: string[],
    form: FormGroup,
    control: AbstractControl | null
  ) {
    const credentials: ICredentials = {
      name: name,
      email: email,
      password: password,
    };
    return this.api
      .signUp(credentials)
      .pipe(
        catchError(error => {
          if (error.error.type === 'PrimaryDuplicationException') {
            localStorage['existedEmail'] = control?.value;
          }
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          control?.setErrors({ existedEmail: true });
          control?.setValidators([
            Validators.email,
            Validators.required,
            existedEmailValidator(localStorage['existedEmail']),
          ]);
          throw new Error(error);
        })
      )
      .subscribe({
        next: () => {
          this.toastService.showSuccess('!! successfully sign up !!');
          form.reset();
          this.router.navigate(['/signin']);
        },
        error: err => console.log(err),
      });
  }

  login([login, password]: string[], form: FormGroup) {
    const credentials: ICredentials = {
      email: login,
      password: password,
    };
    return this.api
      .signIn(credentials)
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          throw new Error(error);
        })
      )
      .subscribe({
        next: res => {
          this.toastService.showSuccess('!! successfully sign in !!');
          localStorage.setItem('token', res.token);
          localStorage.setItem('uid', res.uid);
          localStorage.setItem('email', credentials.email);
          localStorage.setItem('isAuth', 'true');
          form.reset();
          this.router.navigate(['/chat']);
        },
        error: err => console.log(err),
      });
  }

  logout() {
    return this.api
      .logout()
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          localStorage.setItem('isAuth', 'true');
          throw new Error(error);
        })
      )
      .subscribe({
        next: () => {
          this.toastService.showSuccess('!! successfully logout !!');
          this.queryService.clearAll();
          localStorage.clear();
          sessionStorage.clear();
          this.deleteAllCookies();
        },
        error: err => {
          console.log(err);
        },
      });
  }

  showCredentials() {
    return this.api.getCredentials().pipe(
      catchError(error => {
        this.toastService.showDanger(
          error.error.message || '!! check internet connection !!'
        );
        throw new Error(error);
      })
    );
  }

  saveEditedName(name: string) {
    return this.api.saveNewName(name).pipe(
      map(() => {
        const profile: IProfileResponse = JSON.parse(localStorage['profile']);
        profile.name.S = name;
        localStorage.setItem('profile', JSON.stringify(profile));
        this.toastService.showSuccess('!! successfully edit name !!');
        return profile;
      }),
      catchError(error => {
        this.toastService.showDanger(
          error.error.message || '!! check internet connection !!'
        );
        localStorage['editable'] = true;
        throw new Error(error);
      })
    );
  }

  deleteAllCookies() {
    const domain = window.location.hostname;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
      document.cookie =
        name +
        '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=' +
        domain +
        ';path=/';
    }

    this.router.navigate(['/signin']);
  }
}
