import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPopupComponent } from './calendar-popup.component';

describe('CalendarPopupComponent', () => {
  let component: CalendarPopupComponent;
  let fixture: ComponentFixture<CalendarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
