import { TestBed } from '@angular/core/testing';

import { AutentikacijaService } from './autentikacija.service';

describe('AutentikacijaService', () => {
  let service: AutentikacijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentikacijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
