import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/query.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserItem } from '../chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-chat',
  templateUrl: './people-chat.component.html',
  styleUrls: ['./people-chat.component.scss'],
})
export class PeopleChatComponent implements OnInit {
  protected readonly localStorage = localStorage;

  constructor(
    protected queryService: QueryService,
    public modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    if (
      !this.queryService.users ||
      (this.queryService.users as IUserItem[]).length === 0
    ) {
      this.queryService.getUsers();
    }
  }

  getPeople() {
    localStorage.setItem('peopleUpdate', 'disable');
    this.queryService.getUsers();
  }

  openConversation(user: IUserItem) {
    if (user.conversationId) {
      this.router.navigate([`/conversation`, user.conversationId]);
    } else {
      this.queryService.openConversation(user.uid.S, user.name.S);
    }
  }
}
