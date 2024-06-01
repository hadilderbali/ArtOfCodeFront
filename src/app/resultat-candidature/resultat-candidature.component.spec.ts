import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatCandidatureComponent } from './resultat-candidature.component';

describe('ResultatCandidatureComponent', () => {
  let component: ResultatCandidatureComponent;
  let fixture: ComponentFixture<ResultatCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatCandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
