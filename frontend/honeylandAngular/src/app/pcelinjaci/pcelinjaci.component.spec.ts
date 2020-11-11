import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcelinjaciComponent } from './pcelinjaci.component';

describe('PcelinjaciComponent', () => {
  let component: PcelinjaciComponent;
  let fixture: ComponentFixture<PcelinjaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcelinjaciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcelinjaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
