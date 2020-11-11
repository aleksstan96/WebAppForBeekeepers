import { TestBed } from '@angular/core/testing';

import { AutorizacijaAdminService } from './autorizacija-admin.service';

describe('AutorizacijaAdminService', () => {
  let service: AutorizacijaAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacijaAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
