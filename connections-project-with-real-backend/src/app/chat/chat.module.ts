import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { GroupChatModule } from './group-chat/group-chat.module';
import { PeopleChatModule } from './people-chat/people-chat.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, GroupChatModule, PeopleChatModule],
})
export class ChatModule {}
