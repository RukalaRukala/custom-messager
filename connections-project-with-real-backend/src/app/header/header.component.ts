import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly localStorage = localStorage;

  constructor(private auth: AuthService) {}

  logout() {
    localStorage.removeItem('isAuth');
    this.auth.logout();
  }
}
