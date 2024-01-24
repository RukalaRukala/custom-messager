import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/query.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRemoveGroupComponent } from '../components/modal-remove-group/modal-remove-group.component';
import { ModalCreateGroupComponent } from '../components/modal-create-group/modal-create-group.component';
import { IGroupItem } from '../chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss'],
})
export class GroupChatComponent implements OnInit {
  protected readonly localStorage = localStorage;

  constructor(
    protected queryService: QueryService,
    public modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    if (
      !this.queryService.groups ||
      (this.queryService.groups as IGroupItem[]).length === 0
    ) {
      this.queryService.getGroups();
    }
  }

  getGroups() {
    localStorage.setItem('groupUpdate', 'disable');
    this.queryService.getGroups();
  }

  openModal() {
    this.modalService.open(ModalCreateGroupComponent);
  }

  openDeleteModal(group: IGroupItem) {
    const modalRef = this.modalService.open(ModalRemoveGroupComponent);
    modalRef.componentInstance.value = group;
  }

  openChat(group: IGroupItem) {
    return this.queryService.checkGroupList(group.id.S).subscribe({
      next: existedGroupId => {
        this.router.navigate([`/group`, existedGroupId]);
      },
      error: err => console.log(err.message),
    });
  }
}
