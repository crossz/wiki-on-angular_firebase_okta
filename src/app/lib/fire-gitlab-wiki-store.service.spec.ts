import { TestBed } from '@angular/core/testing';

import { FireGitlabWikiStoreService } from './fire-gitlab-wiki-store.service';

describe('FireGitlabWikiStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireGitlabWikiStoreService = TestBed.get(FireGitlabWikiStoreService);
    expect(service).toBeTruthy();
  });
});
