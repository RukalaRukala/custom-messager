import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupChatComponent } from './group-chat.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCreateGroupComponent } from '../components/modal-create-group/modal-create-group.component';

@NgModule({
  declarations: [GroupChatComponent, ModalCreateGroupComponent],
  imports: [
    CommonModule,
    NgbTooltip,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [GroupChatComponent],
})
export class GroupChatModule {}
