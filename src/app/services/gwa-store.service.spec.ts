import { TestBed } from '@angular/core/testing';

import { GwaStoreService } from './gwa-store.service';

describe('GwaStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GwaStoreService = TestBed.get(GwaStoreService);
    expect(service).toBeTruthy();
  });
});
