import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QueryService } from '../../services/query.service';
import { IGroupItem, IUserItem } from '../../chat.model';

@Component({
  selector: 'app-modal-remove-group',
  templateUrl: './modal-remove-group.component.html',
  styleUrls: ['./modal-remove-group.component.scss'],
})
export class ModalRemoveGroupComponent implements OnInit {
  @Input() value!: IUserItem | IGroupItem;

  isCompanion!: boolean;

  modal = inject(NgbActiveModal);

  protected readonly localStorage = localStorage;

  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.isCompanion = 'conversationId' in this.value;
  }

  deleteGroup(group: IGroupItem) {
    this.modal.close('Delete click');
    this.queryService.removeGroup(group.id.S, group.name.S);
  }

  deleteCompanion(user: IUserItem) {
    this.modal.close('Delete click');
    this.queryService.deleteConversation(user);
  }

  delete(value: IUserItem | IGroupItem) {
    if (this.isCompanion) {
      this.deleteCompanion(value as IUserItem);
    } else {
      this.deleteGroup(value as IGroupItem);
    }
  }
}
