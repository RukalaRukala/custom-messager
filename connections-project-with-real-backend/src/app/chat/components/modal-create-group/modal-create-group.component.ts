import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QueryService } from '../../services/query.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-create-group',
  templateUrl: './modal-create-group.component.html',
  styleUrls: ['./modal-create-group.component.scss'],
})
export class ModalCreateGroupComponent implements OnInit {
  protected readonly localStorage = localStorage;

  disable = true;

  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private queryService: QueryService
  ) {}

  get name() {
    return this.form.get('name');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[а-яА-Яa-zA-Z0-9\s]+$/),
      ]),
    });
    this.form.statusChanges.subscribe(status => {
      this.disable = status === 'INVALID';
    });
  }

  createOwnGroup(name: string) {
    this.disable = true;
    this.queryService.createOwnGroup(name, this.activeModal);
  }
}
