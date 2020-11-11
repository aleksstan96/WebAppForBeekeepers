import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcelarComponent } from './pcelar.component';

describe('PcelarComponent', () => {
  let component: PcelarComponent;
  let fixture: ComponentFixture<PcelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcelarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
