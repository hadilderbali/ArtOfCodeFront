import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobApplicationComponent } from './add-job-application.component';

describe('AddJobApplicationComponent', () => {
  let component: AddJobApplicationComponent;
  let fixture: ComponentFixture<AddJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
