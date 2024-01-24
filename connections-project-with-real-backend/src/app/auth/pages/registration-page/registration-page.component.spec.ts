import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegistrationPageComponent } from './registration-page.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [AuthService, HttpTestingController],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    const fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
