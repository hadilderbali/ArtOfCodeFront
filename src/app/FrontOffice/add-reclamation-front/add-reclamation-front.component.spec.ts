import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReclamationFrontComponent } from './add-reclamation-front.component';

describe('AddReclamationFrontComponent', () => {
  let component: AddReclamationFrontComponent;
  let fixture: ComponentFixture<AddReclamationFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReclamationFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReclamationFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
