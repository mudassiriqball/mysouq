import { TestBed, async, inject } from '@angular/core/testing';

import { RedirectloginGuard } from './redirectlogin.guard';

describe('RedirectloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectloginGuard]
    });
  });

  it('should ...', inject([RedirectloginGuard], (guard: RedirectloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
