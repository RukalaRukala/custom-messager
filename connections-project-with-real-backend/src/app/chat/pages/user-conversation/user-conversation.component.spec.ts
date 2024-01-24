import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConversationComponent } from './user-conversation.component';

describe('UserConversationComponent', () => {
  let component: UserConversationComponent;
  let fixture: ComponentFixture<UserConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserConversationComponent],
    });
    fixture = TestBed.createComponent(UserConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
