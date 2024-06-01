import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatAccueilComponent } from './candidat-accueil.component';

describe('CandidatAccueilComponent', () => {
  let component: CandidatAccueilComponent;
  let fixture: ComponentFixture<CandidatAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatAccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
