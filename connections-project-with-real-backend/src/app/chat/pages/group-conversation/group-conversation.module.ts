import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GroupConversationComponent } from './group-conversation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [GroupConversationComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class GroupConversationModule {}
