import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleChatComponent } from './people-chat.component';

describe('PeopleChatComponent', () => {
  let component: PeopleChatComponent;
  let fixture: ComponentFixture<PeopleChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleChatComponent],
    });
    fixture = TestBed.createComponent(PeopleChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
