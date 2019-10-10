import { Injectable, Inject } from '@angular/core';
import { from, Observable, observable, Timestamp } from 'rxjs';


import { FirebaseOptionsToken } from '../modules/gwa-module/gwa-module.module';


@Injectable({
  providedIn: 'root'
})
export class AngularFirestore {
  _collection: WikiPagesCollection;
  _config: any;

  constructor(@Inject(FirebaseOptionsToken) fbConfig: any) {
    this._config = fbConfig;
   }

  /**
   * For the Gitlab Wiki Api:
   * @param path - the project ID
   * @param queryFn - the request METHOD, here are: GET and LIST
   * 
   * @returns pages - a map of wiki pages
   * 
   * For example:
   * curl --request GET --header "PRIVATE-TOKEN: zx8Z3TR3BtapdzvWG_eA" "https://gitlab.com/api/v4/projects/3224459/wikis"
   */
  collection(path: string, queryFn?: any) {

    if (queryFn ===null || queryFn === 'GET') {



      // console.log(firebaseConfig.PRIVATETOKEN);
      console.log(this._config.PRIVATETOKEN);


      
    }
    return this._collection;
  }
}


/**
zhengxin@zhengxindeiMac  ~  curl --request GET --header "PRIVATE-TOKEN: zx8Z3TR3BtapdzvWG_eA" "https://gitlab.com/api/v4/projects/3224459/wikis"
[{"format":"markdown","slug":"Hello","title":"Hello"},{"format":"markdown","slug":"Hello101","title":"Hello101"},{"format":"markdown","slug":"home","title":"home"}]%
 zhengxin@zhengxindeiMac  ~  curl --request GET --header "PRIVATE-TOKEN: zx8Z3TR3BtapdzvWG_eA" "https://gitlab.com/api/v4/projects/3224459/wikis/home"
{"format":"markdown","slug":"home","title":"home","content":"home content.\n\n## subtitle 1\ncontent 1.\n\n## aaa\naaa"}%
 */


/**
 * 
 * 
 */
class WikiPagesCollection {
  _document: WikiPagesDocument;

  constructor() { }

  // doc<T>(path: string): AngularFirestoreDocument<T>;
  doc(path: string) {
    
    return this._document;
    }

}


/**
 * 
 * 
 */
class WikiPagesDocument {
  _snapshotObs: WikiPagesSnapshotObservable;

  constructor() { }

  get(){

    // return new Observable();
    return this._snapshotObs;
  }


}


/**
 * 
 * 
 */
class WikiPagesSnapshotObservable extends Observable<WikiPagesSnapshotMap> {
  _snapshot: WikiPagesSnapshotMap;

  constructor() {
    super();
  }

}


/**
 * 
 * 
 */
class WikiPagesSnapshotMap {
  _page: WikiPagesPageMap;

  constructor() { }

  data () {
    return this._page;
  }

}



/**
 * 
 * 
 */
class WikiPagesPageMap {

  created: number;
  modified: number;


  /**
   * 
    {
      "content" : "Hello world",
      "format" : "markdown",
      "slug" : "Hello",
      "title" : "Hello"
    }
   */
  content: string;
  format: string;
  slug: string;
  title: string;

  /**
   * 
    {
      "file_name" : "dk.png",
      "file_path" : "uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png",
      "branch" : "master",
      "link" : {
        "url" : "uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png",
        "markdown" : "![dk](uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png)"
      }
    }
   */
  file_name: string;
  file_path: string;
  branch: string;
  // TODO: check wich works from the folloing 2:
  // link: Map<string, string>;
  link: {url: string; markdown: string};


  constructor() { }


}