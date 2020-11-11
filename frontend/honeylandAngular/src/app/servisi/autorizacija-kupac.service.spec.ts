import { TestBed } from '@angular/core/testing';

import { AutorizacijaKupacService } from './autorizacija-kupac.service';

describe('AutorizacijaKupacService', () => {
  let service: AutorizacijaKupacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacijaKupacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
