import { Injectable, Inject } from '@angular/core';
import { from, Observable, observable, Timestamp, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { FirebaseOptionsToken } from './fire-gitlab-wiki-store-options.module';
import { FETCH_FROM_API } from './actions/page.action';
import { PageService } from './services/page.service';

import { AppState, Page } from './domain/state';
import { WikiPagesSnapshotObservable } from './fire-gitlab-wiki-store.module';




// Document.get() will yield Observable, which is converted from promise returned from gitlab wiki api.
@Injectable({
  providedIn: 'root'
})
class WikiPagesDocument {
  _snapshotObs: WikiPagesSnapshotObservable;// = new WikiPagesSnapshotObservable();
  _privatetoken: string;
  _gitlabapiurl: string;
  _collectiionId: string;
  _slug: string;
  rxUrl: string;

  constructor(private http: HttpClient,
      private store$: Store<Page>,
      @Inject('pageService') private service
    ) {
  }

  setPrivateToken(privateToken: string) {
    this._privatetoken = privateToken;
  }

  setGitlabApiUrl(gitlabApiUrl: string) {
    this._gitlabapiurl = gitlabApiUrl;
  }

  setCollectiionId(collectiionId: string) {
    this._collectiionId = collectiionId;
    this.service.setCollectiionId(collectiionId)
  }

  setSlug(slug: string) {
    this._slug = slug;
    this.service.setSlug(slug)
  }


  /**
   * For the Gitlab Wiki Api:
   * 
   * 
   * Observable are returned:
   * // const doc = this.db.collection('pages').doc(slug).get();
   */
  get(){
    this.service.get();
    // this._snapshotObs = this.service.get();


    // console.log('----====----==== _privatetoken in WikiPagesDocument.get(): ' + this._privatetoken);
    // console.log('----====----==== _collectiionId in WikiPagesDocument.get(): ' + this._collectiionId);
    // console.log('----====----==== _slug in WikiPagesDocument.get(): ' + this._slug);

    // let headers = new HttpHeaders({
    //   'Content-type': 'application/json',      
    //  });

    // //  let rxUrl = 'https://gitlab.com/api/v4/projects/3224459/wikis/home?private_token=zx8Z3TR3BtapdzvWG_eA';
    //  let rxUrl = this._gitlabapiurl + this._collectiionId + '/wikis/' + this._slug + '?private_token=' + this._privatetoken;

    // // here the response in rx is: {format: "markdown", slug: "home", title: "home", content: "home content.↵↵## subtitle 1↵content 1.↵↵## aaa↵aaa"}
    

    // // var httpgetresp$ = this.http.get(rxUrl, {headers, observe: 'response'}) // response.body for the Wiki Pages as json.
    // // var httpgetresp$ = this.http.get(rxUrl, {headers, responseType: 'json'}) // response for the Wiki Pages as json.
    // //  .subscribe(resp => {console.log(resp.body);}) // for mode of {observe: 'response'}
    // //  .subscribe(resp => {console.log(resp);}) // for mode of simplest
  
    // var httpgetresp$ = this.http.get<WikiPagesSnapshotMap>(rxUrl, {headers, observe: 'response'}) // response.body for the Wiki Pages as json.

    // // the observable operators/operations transform Observable<Object> to WikiPagesSnapshotMap,
    // // so that the snaphot type will work(snapshot.data() will work).
     

    // // .pipe(pluck('body'));
    // .pipe(map(resp => {
    //   // console.log(resp)
    //   let _snapshotInObs = new WikiPagesSnapshotMap(resp);
    //   return _snapshotInObs;})
    // )
    
    // // httpgetresp$.subscribe(this.store$.dispatch({type: FETCH_FROM_API, playload: }))
    

    // this._snapshotObs = httpgetresp$;
    // return this._snapshotObs;

  }


  // TODO: Observable are NOT here, while only for get()
  set() {
  }

}





@Injectable({
  providedIn: 'root'
})
export class AngularFirestore {
  private _config: any;
  private _collection: WikiPagesCollection;
  
  constructor(@Inject(FirebaseOptionsToken) fbConfig: any,
              private _document: WikiPagesDocument
              ) {
    this._config = fbConfig;
   }

  initCollection(path: string) {
    this._collection = new WikiPagesCollection(path);
  }

  /**
   * For the Gitlab Wiki Api:
   * 
   * @param path - the project ID
   * @param queryFn - the request METHOD, here are: GET and LIST
   * 
   * @returns pages - a map of wiki pages
   * 
   * // const doc = this.db.collection('pages').doc(slug).get();
   * 
   * curl usage:
   * // curl --request GET --header "PRIVATE-TOKEN: zx8Z3TR3BtapdzvWG_eA" "https://gitlab.com/api/v4/projects/3224459/wikis"
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


  /**
   * For the Gitlab Wiki Api:
   * 
   * // doc<T>(path: string): AngularFirestoreDocument<T>;
   * // const doc = this.db.collection('pages').doc(slug).get();
   */
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



