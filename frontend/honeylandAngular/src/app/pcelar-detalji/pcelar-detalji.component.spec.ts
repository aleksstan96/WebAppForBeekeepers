import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcelarDetaljiComponent } from './pcelar-detalji.component';

describe('PcelarDetaljiComponent', () => {
  let component: PcelarDetaljiComponent;
  let fixture: ComponentFixture<PcelarDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcelarDetaljiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcelarDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
