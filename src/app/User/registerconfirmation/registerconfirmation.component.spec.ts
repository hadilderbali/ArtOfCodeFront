import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterconfirmationComponent } from './registerconfirmation.component';

describe('RegisterconfirmationComponent', () => {
  let component: RegisterconfirmationComponent;
  let fixture: ComponentFixture<RegisterconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterconfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
