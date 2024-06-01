import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTutorialFrontComponent } from './view-tutorial-front.component';

describe('ViewTutorialFrontComponent', () => {
  let component: ViewTutorialFrontComponent;
  let fixture: ComponentFixture<ViewTutorialFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTutorialFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTutorialFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
