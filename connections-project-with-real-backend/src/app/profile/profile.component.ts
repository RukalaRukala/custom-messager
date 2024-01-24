import { Component, OnInit } from '@angular/core';
import { IProfileResponse } from '../auth/auth.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  protected readonly localStorage = localStorage;

  protected profile!: IProfileResponse;

  disable = true;

  form!: FormGroup;

  constructor(private auth: AuthService) {
    if (localStorage['profile']) {
      this.profile = JSON.parse(localStorage['profile']);
    } else {
      this.auth.showCredentials().subscribe({
        next: data => {
          this.profile = data;
          localStorage.setItem('profile', JSON.stringify(data));
        },
        error: err => console.log(err),
      });
    }
  }

  get name() {
    return this.form.get('name');
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[а-яА-Яa-zA-Z\s]+$/),
      ]),
    });
    this.form.statusChanges.subscribe(status => {
      this.disable = status === 'INVALID';
    });
  }

  showEditArea() {
    localStorage.setItem('editable', 'true');
    this.name?.setValue(this.profile.name.S);
  }

  saveNewName() {
    localStorage.removeItem('editable');
    this.auth.saveEditedName(this.name?.value).subscribe({
      next: profile => {
        this.profile = profile;
      },
      error: err => console.log(err),
    });
  }
}
