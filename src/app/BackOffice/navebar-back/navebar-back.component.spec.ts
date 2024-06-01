import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavebarBackComponent } from './navebar-back.component';

describe('NavebarBackComponent', () => {
  let component: NavebarBackComponent;
  let fixture: ComponentFixture<NavebarBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavebarBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavebarBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
