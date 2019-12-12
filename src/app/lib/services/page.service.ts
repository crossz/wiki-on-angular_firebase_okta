import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
// import { Http, Headers } from '@angular/http'; // Obsolete from Angular 6
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppState, Page } from '../domain/state';
import {
  ADD_TODO, FETCH_FROM_API, UPDATE_COLLECTIONID_OPTS, UPDATE_OPTS, UPDATE_SLUG_OPTS,
} from '../actions/page.action'
import { FirebaseOptionsToken } from '../fire-gitlab-wiki-store-options.module';
import { WikiPagesSnapshotObservable, WikiPagesSnapshotMap } from '../fire-gitlab-wiki-store.module';




@Injectable()
export class PageService {
  _snapshotObs: WikiPagesSnapshotObservable;// = new WikiPagesSnapshotObservable();
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




// For 在开始时就能加载到数据进入 store, 需要在下面的模块中的 constructor() 中去
// 下面这段应该放到 component.ts 中, 在这即 fire-gitlab-wiki-store.service.ts 文件中去


/**
  const fetchData$ = this.service.getTodos()
  .flatMap(todos => {
    this.store$.dispatch({type: FETCH_FROM_API, payload: todos});
    return this.store$.select('todos')
  })
  .startWith([]);
 */

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
    // console.log('####----====----==== rxUrl in WikiPagesDocument.get(): ' + rxUrl);



    let headers = this.headers;

    //  let rxUrl = 'https://gitlab.com/api/v4/projects/3224459/wikis/home?private_token=zx8Z3TR3BtapdzvWG_eA';
     let rxUrl = this._gitlabapiurl + this._collectiionId + '/wikis/' + this._slug + '?private_token=' + this._privatetoken;

    // here the response in rx is: {format: "markdown", slug: "home", title: "home", content: "home content.↵↵## subtitle 1↵content 1.↵↵## aaa↵aaa"}
    

    // var httpgetresp$ = this.http.get(rxUrl, {headers, observe: 'response'}) // response.body for the Wiki Pages as json.
    // var httpgetresp$ = this.http.get(rxUrl, {headers, responseType: 'json'}) // response for the Wiki Pages as json.
    //  .subscribe(resp => {console.log(resp.body);}) // for mode of {observe: 'response'}
    //  .subscribe(resp => {console.log(resp);}) // for mode of simplest
  
    var httpgetresp$ = this.http.get<WikiPagesSnapshotMap>(rxUrl, {headers, observe: 'response'}) // response.body for the Wiki Pages as json.

    // the observable operators/operations transform Observable<Object> to WikiPagesSnapshotMap,
    // so that the snaphot type will work(snapshot.data() will work).
     

    // // .pipe(pluck('body'));
    // .pipe(map(resp => {
    //   // console.log(resp)
    //   let _snapshotInObs = new WikiPagesSnapshotMap(resp);
    //   return _snapshotInObs;})
    // )
    
    // return httpgetresp$;

    .subscribe(resp => {
      this.store$.dispatch({type: FETCH_FROM_API, payload: [resp.body]});
    });

  }

  setCollectiionId(collectiionId: string) {
    this.store$.dispatch({type: UPDATE_COLLECTIONID_OPTS, payload: collectiionId});
  }

  setSlug(slug: string) {
    this.store$.dispatch({type: UPDATE_SLUG_OPTS, payload: slug});
  }

}


