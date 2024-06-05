import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationDetailsComponent } from './job-application-details.component';

describe('JobApplicationDetailsComponent', () => {
  let component: JobApplicationDetailsComponent;
  let fixture: ComponentFixture<JobApplicationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
