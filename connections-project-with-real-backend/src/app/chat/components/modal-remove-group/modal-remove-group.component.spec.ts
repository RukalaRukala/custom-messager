import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemoveGroupComponent } from './modal-remove-group.component';

describe('ModalRemoveGroupComponent', () => {
  let component: ModalRemoveGroupComponent;
  let fixture: ComponentFixture<ModalRemoveGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRemoveGroupComponent],
    });
    fixture = TestBed.createComponent(ModalRemoveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
