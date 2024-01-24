import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { NgbAlert, NgbAlertModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgbAlert,
    NgbAlertModule,
    NgbToast,
  ],
  exports: [LoginPageComponent, RegistrationPageComponent],
})
export class AuthModule {}
