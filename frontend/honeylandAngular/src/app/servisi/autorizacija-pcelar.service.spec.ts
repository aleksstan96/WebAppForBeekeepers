import { TestBed } from '@angular/core/testing';

import { AutorizacijaPcelarService } from './autorizacija-pcelar.service';

describe('AutorizacijaPcelarService', () => {
  let service: AutorizacijaPcelarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacijaPcelarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
