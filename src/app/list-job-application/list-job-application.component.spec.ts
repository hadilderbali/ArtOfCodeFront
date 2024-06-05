import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobApplicationComponent } from './list-job-application.component';

describe('ListJobApplicationComponent', () => {
  let component: ListJobApplicationComponent;
  let fixture: ComponentFixture<ListJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJobApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
