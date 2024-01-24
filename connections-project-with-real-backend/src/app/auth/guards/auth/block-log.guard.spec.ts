import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blockLogGuard } from './block-log.guard';

describe('blockLogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => blockLogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
