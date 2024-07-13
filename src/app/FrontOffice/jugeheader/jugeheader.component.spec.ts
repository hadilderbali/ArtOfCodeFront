import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugeheaderComponent } from './jugeheader.component';

describe('JugeheaderComponent', () => {
  let component: JugeheaderComponent;
  let fixture: ComponentFixture<JugeheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugeheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugeheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
