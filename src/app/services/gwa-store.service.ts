import { Injectable } from '@angular/core';
import { from, Observable, observable, Timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularFirestore {
  _collection: WikiPagesCollection;


  constructor() { }

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
  content: string;
  created: number;
  modified: number;

  constructor() { }


}