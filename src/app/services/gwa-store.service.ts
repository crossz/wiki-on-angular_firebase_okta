import { Injectable, Inject } from '@angular/core';
import { from, Observable, observable, Timestamp, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { FirebaseOptionsToken } from '../modules/gwa-module/gwa-module.module';


@Injectable({
  providedIn: 'root'
})
export class AngularFirestore {
  _config: any;
  _collection: WikiPagesCollection;
  

  constructor(@Inject(FirebaseOptionsToken) fbConfig: any,
              // private http: HttpClient
              ) {
    this._config = fbConfig;
   }

  initCollection(path: string) {
    this._collection = new WikiPagesCollection(path);
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
    this.initCollection(path);

    if (queryFn === '' || queryFn === 'GET') {
      console.log('----====----==== PRIVATETOKEN in AngularFirestore.collection(): ' + this._config.PRIVATETOKEN);


      this._collection.setPrivateToken(this._config.PRIVATETOKEN);
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
  _privatetoken: string;
  _collectiionId: string;
  
  constructor(path: string) {
    this._collectiionId = path;
  }

  initDocument(path: string) {
    this._document = new WikiPagesDocument(path);
  }

  setPrivateToken(privateToken: string) {
    this._privatetoken = privateToken;
  }
  

  // doc<T>(path: string): AngularFirestoreDocument<T>;
  doc(path: string) {
    console.log('----====----==== _privatetoken in WikiPagesCollection.doc(): ' + this._privatetoken);
    console.log('----====----==== _collectiionId in WikiPagesCollection.doc(): ' + this._collectiionId);


    this.initDocument(path);
    this._document.setPrivateToken(this._privatetoken);
    this._document.setCollectiionId(this._collectiionId);

    return this._document;
    }

}


/**
 * Document.get() will yield Observable, which is converted from promise returned from gitlab wiki api.
 * 
 */
class WikiPagesDocument {
  _snapshotObs: WikiPagesSnapshotObservable = new WikiPagesSnapshotObservable();
  _privatetoken: string;
  _collectiionId: string;
  _slug: string;

  private http: HttpClient;

  constructor(path: string) {
    this._slug = path;
  }
   

  setPrivateToken(privateToken: string) {
    this._privatetoken = privateToken;
  }

  setCollectiionId(collectiionId: string) {
    this._collectiionId = collectiionId;
  }

  // Observable are returned.
  get(){
    console.log('----====----==== _privatetoken in WikiPagesDocument.get(): ' + this._privatetoken);
    console.log('----====----==== _collectiionId in WikiPagesDocument.get(): ' + this._collectiionId);
    console.log('----====----==== _slug in WikiPagesDocument.get(): ' + this._slug);


    let headers = new HttpHeaders({
      'Content-type': 'application/json',
     });

     let rxUrl = 'https://gitlab.com/api/v4/projects/3224459/wikis/home?private_token=zx8Z3TR3BtapdzvWG_eA';

    //  let headers = new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': 'my-auth-token'
    // })


    // this.http.get(rxUrl, {headers})
    // .toPromise()
    // .then(res => res.json())
    // .catch(err => {
    //     return Promise.reject(err.json().error  || 'Server error');
    // });



    var mocked = [
      new WikiPagesSnapshotMap('aaa'),
      // new WikiPagesSnapshotMap('bbb'),
    ]

    this._snapshotObs = from(mocked);





    // return new Observable();
    return this._snapshotObs;
  }

  // Observable are NOT here, while only for get()
  set() {

  }

}


/**
 * 
 * 
 */
class WikiPagesSnapshotObservable extends Observable<WikiPagesSnapshotMap> {

  constructor() {
    super();
  }

}


/**
 * Snapshot is the element from the rxjs observable variable, i.e. WikiPagesSnapshotMap.
 * One Snapshot is one page container, and it could include other variables such as http header etc.
 * 
 */
class WikiPagesSnapshotMap {
  _page: WikiPagesPageMap;
  slug: string;

  /**
   * 
   * @param slug 
   * @param title 
   * @param created 
   * @param modified 
   */
  constructor(slug) {
    this.slug = slug;
  }

  data () {
    let pageMap = new WikiPagesPageMap(this.slug);
    pageMap.getdata();
    this._page = pageMap;
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


  /**
   * some variables which are not for returning pages' data.
  */


  /**
   * 
   * @param slug 
   * @param title 
   * @param created 
   * @param modified 
   */
  constructor(slug, title?, created?, modified?) {
    this.slug = slug;
    if (title!=null) {this.title = title };
    if (created!=null) {this.created = created };
    if (modified!=null) {this.modified = modified };

  }

  /**
   * TODO: retrieve data from the observable (converted from promise returned by gitlab wiki api).
   * This getadata() do NOT any actions related to remote connection, while only deal with the snaphot type of variable.
  */ 
  getdata() {
    let content_mocked = this.slug + this.slug;
    this.content = content_mocked;
  }

}