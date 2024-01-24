import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCreateGroupComponent } from './modal-create-group.component';

describe('ModalCreateGroupComponent', () => {
  let component: ModalCreateGroupComponent;
  let fixture: ComponentFixture<ModalCreateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateGroupComponent],
    });
    fixture = TestBed.createComponent(ModalCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
