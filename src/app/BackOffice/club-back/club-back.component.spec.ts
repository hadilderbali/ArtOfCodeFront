import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubBackComponent } from './club-back.component';

describe('ClubBackComponent', () => {
  let component: ClubBackComponent;
  let fixture: ComponentFixture<ClubBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
