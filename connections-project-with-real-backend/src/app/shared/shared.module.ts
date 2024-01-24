import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesComponent } from '../chat/components/messages/messages.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [NotFoundPageComponent, MessagesComponent],
  imports: [CommonModule, NgTemplateOutlet, NgbToastModule, RouterLink],
  exports: [MessagesComponent],
})
export class SharedModule {}
