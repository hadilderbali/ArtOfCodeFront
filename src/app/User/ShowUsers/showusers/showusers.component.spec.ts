import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowusersComponent } from './showusers.component';

describe('ShowusersComponent', () => {
  let component: ShowusersComponent;
  let fixture: ComponentFixture<ShowusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
