import { TestBed } from '@angular/core/testing';

import { ProizvodiService } from './proizvodi.service';

describe('ProizvodiService', () => {
  let service: ProizvodiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProizvodiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
