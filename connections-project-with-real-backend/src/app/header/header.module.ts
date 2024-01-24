import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HeaderComponent, ThemeToggleComponent],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
