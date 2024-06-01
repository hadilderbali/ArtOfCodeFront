import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturejugeFrontComponent } from './candidaturejuge-front.component';

describe('CandidaturejugeFrontComponent', () => {
  let component: CandidaturejugeFrontComponent;
  let fixture: ComponentFixture<CandidaturejugeFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidaturejugeFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidaturejugeFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
