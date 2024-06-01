import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecandidacyComponent } from './updatecandidacy.component';

describe('UpdatecandidacyComponent', () => {
  let component: UpdatecandidacyComponent;
  let fixture: ComponentFixture<UpdatecandidacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecandidacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecandidacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
