import { Component, Input } from '@angular/core';
import { IMessage, IUserItem } from '../../chat.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  @Input() messages: IMessage[] | undefined;

  @Input() companion!: string | undefined;

  @Input() users!: IUserItem[] | undefined;

  me = localStorage['uid'];

  getUserName(message: IMessage, users: IUserItem[] | undefined) {
    return users?.find(user => user.uid.S === message.authorID.S)?.name.S;
  }
}
