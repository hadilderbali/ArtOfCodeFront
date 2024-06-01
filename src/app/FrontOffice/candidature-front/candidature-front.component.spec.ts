import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureFrontComponent } from './candidature-front.component';

describe('CandidatureFrontComponent', () => {
  let component: CandidatureFrontComponent;
  let fixture: ComponentFixture<CandidatureFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatureFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatureFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
