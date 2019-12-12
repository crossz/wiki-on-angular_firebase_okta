import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from './services/page.service';
import { StoreModule } from '@ngrx/store';
import { pageReducer, optsReducer } from './reducers/page.reducer';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      pages: pageReducer,
      opts: optsReducer
    }),
  ],
  providers: [
    {provide: 'pageService', useClass: PageService}
]
})
export class AngularFireModule {
}


  /**
   * For the Gitlab Wiki Api:
   * 
   * From Snapshot flow/observable, WikiPagesDocument.get() returned, to get one specific snapshot 
   * // this.subs = doc.subscribe((snapshot) => { ... }
   */
export class WikiPagesSnapshotObservable extends Observable<WikiPagesSnapshotMap> {

    constructor() {
      super();
    }
  
  }

export class WikiPagesSnapshotMap {
  _resp: HttpResponse<Object>;
  _page: WikiPagesPageMap;
  
  constructor(resp: HttpResponse<Object>) {
    this._resp = resp;
  }

  
  /**
   * For the Gitlab Wiki Api:
   * 
   * From snapshot to retrieve data for wiki page display.
   * // const page = snapshot.data();
   */
  data () {
    this._page = new WikiPagesPageMap(this._resp['body']);
    
    return this._page;
  }

}

class WikiPagesPageMap {
  _respBody: object;

  // TODO: These two important properties are not returned from Gitlab Wiki Api.
  created: number;
  modified: number;
 
    // {
    //   "content" : "Hello world",
    //   "format" : "markdown",
    //   "slug" : "Hello",
    //   "title" : "Hello"
    // }
   
  content: string;
  format: string;
  slug: string;
  title: string;

  // TODO: POST method will return: 
  // response (post method) from uploading an attachment to the wiki repository:   
    // {
    //   "file_name" : "dk.png",
    //   "file_path" : "uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png",
    //   "branch" : "master",
    //   "link" : {
    //     "url" : "uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png",
    //     "markdown" : "![dk](uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png)"
    //   }
    // }

  file_name: string;
  file_path: string;
  branch: string;

  // TODO: check wich works from the folloing 2:
  // link: Map<string, string>;
  link: {url: string; markdown: string};


  // some other variables which are not for returning pages' data.
  // such as: headers etc.

  constructor(rb: object) {
    this._respBody = rb;
    this.getdata();
  }

  getdata() {
    // let content_mocked = this.slug + this.slug;
    // this.content = content_mocked;

    this.slug = this._respBody['slug'];
    this.title = this._respBody['title'];
    this.format = this._respBody['format'];
    this.content = this._respBody['content'];

    this.created = this._respBody['created'];
    this.modified = this._respBody['modified'];
  }

}

