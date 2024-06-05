import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobApplicationComponent } from './update-job-application.component';

describe('UpdateJobApplicationComponent', () => {
  let component: UpdateJobApplicationComponent;
  let fixture: ComponentFixture<UpdateJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateJobApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
