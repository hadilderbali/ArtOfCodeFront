import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsReclamationComponent } from './statistics-reclamation.component';

describe('StatisticsReclamationComponent', () => {
  let component: StatisticsReclamationComponent;
  let fixture: ComponentFixture<StatisticsReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
