import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireGitlabWikiStoreComponent } from './fire-gitlab-wiki-store.component';

describe('FireGitlabWikiStoreComponent', () => {
  let component: FireGitlabWikiStoreComponent;
  let fixture: ComponentFixture<FireGitlabWikiStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireGitlabWikiStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireGitlabWikiStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
