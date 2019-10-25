import { Injectable, Inject } from '@angular/core';
import { from, Observable, observable, Timestamp, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { FirebaseOptionsToken } from './fire-gitlab-wiki-store.module';


@Injectable({
  providedIn: 'root'
})
export class AngularFirestore {
  _config: any;
  _collection: WikiPagesCollection;
  _document: WikiPagesDocument;
  

  constructor(@Inject(FirebaseOptionsToken) fbConfig: any,
              private http: HttpClient
              ) {
    this._config = fbConfig;
   }

  initCollection(path: string) {
    this._collection = new WikiPagesCollection(path);
    this._document = new WikiPagesDocument(this.http);
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

    if (!queryFn || queryFn === 'GET') {
      console.log('----====----==== PRIVATETOKEN in AngularFirestore.collection(): ' + this._config.PRIVATETOKEN);

      this._collection.setPrivateToken(this._config.PRIVATETOKEN);
      this._collection.setGitlabApiUrl(this._config.GITLABAPIURL);
      this._collection.setDocument(this._document);
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
  _collectiionId: string;
  _document: WikiPagesDocument;
  _privatetoken: string;
  _gitlabapiurl: string;
  
  
  constructor(path: string) {
    this._collectiionId = path;
  }

  setDocument(document: WikiPagesDocument) {
    this._document = document;
  }

  setPrivateToken(privateToken: string) {
    this._privatetoken = privateToken;
  }

  setGitlabApiUrl(gitlabApiUrl: string) {
    this._gitlabapiurl = gitlabApiUrl;
  }

  // doc<T>(path: string): AngularFirestoreDocument<T>;
  doc(path: string) {
    console.log('----====----==== _privatetoken in WikiPagesCollection.doc(): ' + this._privatetoken);
    console.log('----====----==== _collectiionId in WikiPagesCollection.doc(): ' + this._collectiionId);

    this._document.setSlug(path);
    this._document.setPrivateToken(this._privatetoken);
    this._document.setCollectiionId(this._collectiionId);
    this._document.setGitlabApiUrl(this._gitlabapiurl);
    return this._document;
    }
}


/**
 * Document.get() will yield Observable, which is converted from promise returned from gitlab wiki api.
 * 
 */
 class WikiPagesDocument {
  _snapshotObs: WikiPagesSnapshotObservable;// = new WikiPagesSnapshotObservable();
  _privatetoken: string;
  _gitlabapiurl: string;
  _collectiionId: string;
  _slug: string;

  constructor(private http: HttpClient) {
  }

  setPrivateToken(privateToken: string) {
    this._privatetoken = privateToken;
  }

  setGitlabApiUrl(gitlabApiUrl: string) {
    this._gitlabapiurl = gitlabApiUrl;
  }

  setCollectiionId(collectiionId: string) {
    this._collectiionId = collectiionId;
  }

  setSlug(slug: string) {
    this._slug = slug;
  }

  // Observable are returned.
  get(){
    console.log('----====----==== _privatetoken in WikiPagesDocument.get(): ' + this._privatetoken);
    console.log('----====----==== _collectiionId in WikiPagesDocument.get(): ' + this._collectiionId);
    console.log('----====----==== _slug in WikiPagesDocument.get(): ' + this._slug);


    let headers = new HttpHeaders({
      'Content-type': 'application/json',      
     });

    //  let rxUrl = 'https://gitlab.com/api/v4/projects/3224459/wikis/home?private_token=zx8Z3TR3BtapdzvWG_eA';
     let rxUrl = this._gitlabapiurl + this._collectiionId + '/wikis/' + this._slug + '?private_token=' + this._privatetoken;

    /**
     * here the response in rx is: {format: "markdown", slug: "home", title: "home", content: "home content.↵↵## subtitle 1↵content 1.↵↵## aaa↵aaa"}
     */
    // var httpgetresp$ = this.http.get(rxUrl, {headers, observe: 'response'}) // response.body for the Wiki Pages as json.
    // var httpgetresp$ = this.http.get(rxUrl, {headers, responseType: 'json'}) // response for the Wiki Pages as json.
  //  .subscribe(resp => {console.log(resp.body);}) // for mode of {observe: 'response'}
  //  .subscribe(resp => {console.log(resp);}) // for mode of simplest
  

    var httpgetresp$ = this.http.get<WikiPagesSnapshotMap>(rxUrl, {headers, observe: 'response'}) // response.body for the Wiki Pages as json.

    /**
     * the observable operators/operations transform Observable<Object> to WikiPagesSnapshotMap,
     * so that the snaphot type will work(snapshot.data() will work).
     */
    // .pipe(pluck('body'));
    .pipe(map(resp => {
      // console.log(resp)
      let _snapshotInObs = new WikiPagesSnapshotMap(resp);
      return _snapshotInObs;})
    )
    


    this._snapshotObs = httpgetresp$;
    return this._snapshotObs;







      // /**
      //  * javascript body -> Map.
      //  */
      // let rb = resp.body;
      // console.log(typeof rb === 'object');
      // console.log(rb['format']);

      // const xah_obj_to_map = ( obj => {
      //   const mp = new Map;
      //   Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
      //   return mp;
      // });
      // console.log ( xah_obj_to_map ( rb ) );
      // ///////////////////////////




      // ar.push(new WikiPagesSnapshotMap(resp.body));
      // console.log(ar.push('aaaa'));

      // console.log(ar);
      // console.log(ar[0]);
  // })
    // /**
    //  * the following will not output anything because the http/observable are async, i.e. have some delay.
    //  */ 
    // console.log(ar);
    // console.log(ar[0]);


    

    // console.log('----====----====----==== observable: ')
    // console.log(aaa$);






    // var mocked = [
    //   new WikiPagesSnapshotMap('aaa'),
    //   new WikiPagesSnapshotMap('bbb'),
    // ]
    // this._snapshotObs = from(mocked);





    // this._snapshotObs = httpgetresp$;




    // // return new Observable();
    // return this._snapshotObs;
  }


  // TODO: Observable are NOT here, while only for get()
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
  _resp: HttpResponse<Object>;
  _page: WikiPagesPageMap;
  
  constructor(resp: HttpResponse<Object>) {
    this._resp = resp;
  }

  data () {
    this._page = new WikiPagesPageMap(this._resp['body']);
    
    return this._page;
  }

}

class WikiPagesPageMap {
  _respBody: object;

  /**
   * TODO: These two important properties are not returned from Gitlab Wiki Api.
   */
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
   * TODO: POST method will return: 
   * response (post method) from uploading an attachment to the wiki repository:
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
   * some other variables which are not for returning pages' data.
   * such as: headers etc.
  */


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