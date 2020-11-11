import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosniceComponent } from './kosnice.component';

describe('KosniceComponent', () => {
  let component: KosniceComponent;
  let fixture: ComponentFixture<KosniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KosniceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KosniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
