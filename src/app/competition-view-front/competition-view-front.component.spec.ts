import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionViewFrontComponent } from './competition-view-front.component';

describe('CompetitionViewFrontComponent', () => {
  let component: CompetitionViewFrontComponent;
  let fixture: ComponentFixture<CompetitionViewFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionViewFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionViewFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
