import { TestBed } from '@angular/core/testing';

import { NBAService } from './nba.service';

describe('NBAService', () => {
  let service: NBAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NBAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
