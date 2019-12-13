import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
// import { Http, Headers } from '@angular/http'; // Obsolete from Angular 6
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppState, Page } from '../domain/state';
import {
  ADD_TODO, FETCH_FROM_API, UPDATE_COLLECTIONID_OPTS, UPDATE_SLUG_OPTS, FETCH_FROM_SNAPSHOT
} from '../actions/page.action'
import { FirebaseOptionsToken } from '../fire-gitlab-wiki-store-options.module';
import { WikiPagesSnapshotMap } from '../classes/WikiPages';




@Injectable()
export class PageService {
  // _snapshotObs: WikiPagesSnapshotObservable;// = new WikiPagesSnapshotObservable();
  _privatetoken: string;
  _gitlabapiurl: string;
  _collectiionId: string;
  _slug: string;

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    @Inject(FirebaseOptionsToken) fbConfig: any,
    private http: HttpClient, 
    private store$: Store<AppState>
    ) {
      this._gitlabapiurl = fbConfig.GITLABAPIURL;
      this._privatetoken = fbConfig.PRIVATETOKEN;
      this._collectiionId = '';
      this._slug =  '';
  }

  // POST /todos
  addTodo(desc:string): void{
    let api_url = 'http://localhost:3000/todos';

    let todoToAdd = {
      id: Number,
      desc: desc,
      completed: false
    };
    this.http
      .post(api_url, JSON.stringify(todoToAdd), {headers: this.headers})
      .subscribe(todo => {
        this.store$.dispatch({type: ADD_TODO, payload: todo});
      });
  }
  // GET /todos
  getTodos(): Observable<Page[]> {
    let api_url = 'http://localhost:3000/todos';
    return this.http.get<any>(`${api_url}`);
  }


  // GET and RETURN doc$ to the component.ts
  get(collectiionId: string, slug: string){
    // 获取 gitlab rx url parameter: project/collection id + slug
    const opts$ = this.store$.select('opts'); 
    opts$.subscribe((snapshot) => {
      this._collectiionId = snapshot.projectId;
      this._slug = snapshot.slug;
    })


    console.log('####----====----==== _privatetoken in WikiPagesDocument.get(): ' + this._privatetoken);
    console.log('####----====----==== _collectiionId in WikiPagesDocument.get(): ' + this._collectiionId);
    console.log('####----====----==== _slug in WikiPagesDocument.get(): ' + this._slug);


    let headers = this.headers;

    //  let rxUrl = 'https://gitlab.com/api/v4/projects/3224459/wikis/home?private_token=zx8Z3TR3BtapdzvWG_eA';
     let rxUrl = this._gitlabapiurl + this._collectiionId + '/wikis/' + this._slug + '?private_token=' + this._privatetoken;

    // here the response in rx is: {format: "markdown", slug: "home", title: "home", content: "home content.↵↵## subtitle 1↵content 1.↵↵## aaa↵aaa"}
    

    // var httpgetresp$ = this.http.get(rxUrl, {headers, observe: 'response'}) // response.body for the Wiki Pages as json.
    // var httpgetresp$ = this.http.get(rxUrl, {headers, responseType: 'json'}) // response for the Wiki Pages as json.
    //  .subscribe(resp => {console.log(resp.body);}) // for mode of {observe: 'response'}
    //  .subscribe(resp => {console.log(resp);}) // for mode of simplest
  
    // response.body for the Wiki Pages as json.
    this.http.get<WikiPagesSnapshotMap>(rxUrl, {headers, observe: 'response'})
    .subscribe(resp => {
      this.store$.dispatch({type: FETCH_FROM_API, payload: [resp.body]});
    });
    // .subscribe(
    //   resp => {this.store$.dispatch({type: FETCH_FROM_SNAPSHOT, payload: resp});
    // });

  }

  setCollectiionId(collectiionId: string) {
    this.store$.dispatch({type: UPDATE_COLLECTIONID_OPTS, payload: collectiionId});
  }

  setSlug(slug: string) {
    this.store$.dispatch({type: UPDATE_SLUG_OPTS, payload: slug});
  }

}
