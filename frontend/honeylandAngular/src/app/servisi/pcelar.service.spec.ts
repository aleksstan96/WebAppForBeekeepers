import { TestBed } from '@angular/core/testing';

import { PcelarService } from './pcelar.service';

describe('PcelarService', () => {
  let service: PcelarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcelarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
