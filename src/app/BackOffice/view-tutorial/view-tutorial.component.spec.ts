import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTutorialComponent } from './view-tutorial.component';

describe('ViewTutorialComponent', () => {
  let component: ViewTutorialComponent;
  let fixture: ComponentFixture<ViewTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
