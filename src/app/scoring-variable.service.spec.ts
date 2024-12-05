import { TestBed } from '@angular/core/testing';

import { ScoringVariableService } from './services/scoring-variable.service';

describe('ScoringVariableService', () => {
  let service: ScoringVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoringVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
