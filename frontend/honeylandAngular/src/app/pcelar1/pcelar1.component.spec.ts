import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pcelar1Component } from './pcelar1.component';

describe('Pcelar1Component', () => {
  let component: Pcelar1Component;
  let fixture: ComponentFixture<Pcelar1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pcelar1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pcelar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
