import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTutorialFrontComponent } from './filter-tutorial-front.component';

describe('FilterTutorialFrontComponent', () => {
  let component: FilterTutorialFrontComponent;
  let fixture: ComponentFixture<FilterTutorialFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTutorialFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTutorialFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
