import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGroupItem } from '../../chat.model';
import { QueryService } from '../../services/query.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRemoveGroupComponent } from '../../components/modal-remove-group/modal-remove-group.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-group-conversation',
  templateUrl: './group-conversation.component.html',
  styleUrls: ['./group-conversation.component.scss'],
})
export class GroupConversationComponent implements OnInit, OnDestroy {
  protected readonly localStorage = localStorage;

  group!: IGroupItem;

  disable = true;

  form!: FormGroup;

  constructor(
    protected queryService: QueryService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(): void {
    const timer = JSON.stringify(
      this.queryService.timers.groupConversationTimer
    );
    localStorage.setItem('gTimer', timer);
    localStorage.setItem('openedGroup', JSON.stringify(this.group));
    localStorage.setItem('groups', JSON.stringify(this.queryService.groups));
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
          if (localStorage['openedGroup']) {
            return this.reloadGroupChat();
          } else {
            return this.loadGroupChat(params);
          }
        })
      )
      .subscribe((group: IGroupItem) => {
        this.group.messages = group.messages;
      });
  }

  loadGroupChat(params: Params) {
    this.group = this.queryService.groups.find(
      group => group.id.S === params['groupID']
    ) as IGroupItem;

    return this.queryService.loadGroupMessages(this.group);
  }

  reloadGroupChat() {
    const localGroup = JSON.parse(localStorage['openedGroup']);
    const groups = JSON.parse(localStorage['groups']);
    const timer = JSON.parse(localStorage['gTimer']);
    this.group = localGroup;
    this.queryService.groups = groups;
    this.queryService.timers.groupConversationTimer = timer;
    this.queryService.startTimer('groupConversation');
    return this.queryService.loadGroupMessages(this.group);
  }

  updateChat(group: IGroupItem) {
    localStorage.setItem(`groupConversationUpdate`, 'disable');
    this.queryService.loadGroupMessages(group).subscribe(chosenGroup => {
      this.group.messages = chosenGroup.messages;
      this.queryService.startTimer('groupConversation');
    });
  }

  sendMessage(input: HTMLInputElement, message: string) {
    if (this.form.valid) {
      this.disable = true;
      this.queryService
        .sendGroupMessage(this.group, message, input)
        .subscribe(group => {
          this.group.messages = group.messages;
        });
    }
  }

  openDeleteModal(group: IGroupItem) {
    const modalRef = this.modalService.open(ModalRemoveGroupComponent);
    modalRef.componentInstance.value = group;
  }

  ngOnDestroy() {
    localStorage.removeItem('openedGroup');
    localStorage.removeItem('groups');
    localStorage.removeItem('gTimer');
  }
}
