import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSendComponentComponent } from './MessageSendComponentComponent';

describe('MessageSendComponentComponent', () => {
  let component: MessageSendComponentComponent;
  let fixture: ComponentFixture<MessageSendComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageSendComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSendComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
