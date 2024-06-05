import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticRatingComponent } from './static-rating.component';

describe('StaticRatingComponent', () => {
  let component: StaticRatingComponent;
  let fixture: ComponentFixture<StaticRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
