import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCompetitionFrontComponent } from './formulaire-competition-front.component';

describe('FormulaireCompetitionFrontComponent', () => {
  let component: FormulaireCompetitionFrontComponent;
  let fixture: ComponentFixture<FormulaireCompetitionFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCompetitionFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireCompetitionFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
