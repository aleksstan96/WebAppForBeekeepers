import { TestBed } from '@angular/core/testing';

import { PlanerServisService } from './planer-servis.service';

describe('PlanerServisService', () => {
  let service: PlanerServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanerServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
