import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecompetitionComponent } from './updatecompetition.component';

describe('UpdatecompetitionComponent', () => {
  let component: UpdatecompetitionComponent;
  let fixture: ComponentFixture<UpdatecompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecompetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
