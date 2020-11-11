import { TestBed } from '@angular/core/testing';

import { PcelinjakService } from './pcelinjak.service';

describe('PcelinjakService', () => {
  let service: PcelinjakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcelinjakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
