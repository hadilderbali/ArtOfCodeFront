import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompetitionFrontComponent } from './list-competition-front.component';

describe('ListCompetitionFrontComponent', () => {
  let component: ListCompetitionFrontComponent;
  let fixture: ComponentFixture<ListCompetitionFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompetitionFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompetitionFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
