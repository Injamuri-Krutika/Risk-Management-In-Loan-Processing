import { TestBed } from '@angular/core/testing';

import { KnowEligibilityService } from './know-eligibility.service';

describe('KnowEligibilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnowEligibilityService = TestBed.get(KnowEligibilityService);
    expect(service).toBeTruthy();
  });
});
