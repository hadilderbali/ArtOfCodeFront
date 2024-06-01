import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReclamationComponent } from './view-reclamation.component';

describe('ViewReclamationComponent', () => {
  let component: ViewReclamationComponent;
  let fixture: ComponentFixture<ViewReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
