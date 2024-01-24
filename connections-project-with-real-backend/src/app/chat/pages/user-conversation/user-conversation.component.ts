import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { IUserItem } from '../../chat.model';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalRemoveGroupComponent } from '../../components/modal-remove-group/modal-remove-group.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-conversation',
  templateUrl: './user-conversation.component.html',
  styleUrls: ['./user-conversation.component.scss'],
})
export class UserConversationComponent implements OnInit, OnDestroy {
  protected readonly localStorage = localStorage;

  disable = true;

  form!: FormGroup;

  companion!: IUserItem;

  constructor(
    protected queryService: QueryService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(): void {
    const timer = JSON.stringify(
      this.queryService.timers.userConversationTimer
    );
    localStorage.setItem('uTimer', timer);
    localStorage.setItem('openedUser', JSON.stringify(this.companion));
    localStorage.setItem('users', JSON.stringify(this.queryService.users));
  }

  get myMessage() {
    return this.form.get('myMessage');
  }

  ngOnInit() {
    this.form = new FormGroup({
      myMessage: new FormControl('', [Validators.required]),
    });
    this.form.statusChanges.subscribe(status => {
      this.disable = status === 'INVALID';
    });

    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          if (localStorage['openedUser']) {
            return this.reloadUserChat();
          } else {
            return this.loadUserChat(params);
          }
        })
      )
      .subscribe(user => (this.companion = user));
  }

  loadUserChat(params: Params) {
    this.companion = this.queryService.users.find(
      user => user.conversationId === params['conversationID']
    ) as IUserItem;

    return this.queryService.loadCompanion(this.companion);
  }

  reloadUserChat() {
    const user = JSON.parse(localStorage['openedUser']);
    const users = JSON.parse(localStorage['users']);
    const timer = JSON.parse(localStorage['uTimer']);
    this.companion = user;
    this.queryService.users = users;
    this.queryService.timers.userConversationTimer = timer;
    this.queryService.startTimer('userConversation');

    return this.queryService.loadCompanion(this.companion);
  }

  updateChat(companion: IUserItem) {
    localStorage.setItem('userConversationUpdate', 'disable');
    this.queryService.loadCompanion(companion).subscribe(user => {
      this.companion = user;
      this.queryService.startTimer('userConversation');
    });
  }

  sendMessage(input: HTMLInputElement, message: string) {
    if (this.form.valid) {
      this.disable = true;
      this.queryService
        .sendMessage(this.companion, message, input)
        .subscribe(companion => {
          this.companion.messages = companion.messages;
        });
    }
  }

  openDeleteModal(user: IUserItem) {
    const modalRef = this.modalService.open(ModalRemoveGroupComponent);
    modalRef.componentInstance.value = user;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('openedUser');
    localStorage.removeItem('users');
    localStorage.removeItem('uTimer');
  }
}
