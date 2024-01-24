import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleChatComponent } from './people-chat.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [PeopleChatComponent],
  imports: [CommonModule, NgbTooltip, RouterLink],
  exports: [PeopleChatComponent],
})
export class PeopleChatModule {}
