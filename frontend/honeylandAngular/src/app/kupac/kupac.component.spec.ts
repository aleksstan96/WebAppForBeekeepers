import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacComponent } from './kupac.component';

describe('KupacComponent', () => {
  let component: KupacComponent;
  let fixture: ComponentFixture<KupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
