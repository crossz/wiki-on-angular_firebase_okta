import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// import { OktaAuthService } from '@okta/okta-angular';
import { OktaAuthService } from '../services/okta-auth.service';


import { AngularFirestore } from '../lib/fire-gitlab-wiki-store.service'; // for dev and test purpose
import { AppState } from '../lib/domain/state';
import { Store } from '@ngrx/store';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFirestore } from 'fire-gitlab-wiki-store';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  slug: string;
  content: string;
  created: number;
  modified: number;

  subs: Subscription;
  _config: any;

  constructor(private oktaAuth: OktaAuthService,
              private db: AngularFirestore,
              private route: ActivatedRoute,
              private store$: Store<AppState>  
            ) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadPage(params.get('slug') || 'home');
    });

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  loadPage(slug) {

    if (this.subs) {
      this.subs.unsubscribe();
    }

    // const doc = this.db.collection('pages').doc(slug).get();
    const doc = this.db.collection('3224459').doc(slug).get();

    /**
     * in the file of @angular/fire/firestore/document/document.js:
     * this.ref is the object represented by 'pages', 
     * this.options is null. where the get() is from Map.get( ) In JavaScript, and it can be anything, even null or ''.
     * 
     * Therefore, the final var returned is actually from 'from()'.
     * from() as a Rxjs function, is to, turn an array, promise, or iterable into an observable.
     * Ref: https://www.learnrxjs.io/operators/creation/from.html
     * 
     */
    // AngularFirestoreDocument.prototype.get = function (options) {
    //   return from(this.ref.get(options)).pipe(runInZone(this.afs.scheduler.zone));
    // };


      doc.subscribe((snapshot) => {
        console.log(' ---- snapshot --- ');
        console.log(snapshot);
  

        const page = snapshot[0]
        
        // const page = snapshot
        // const page = snapshot.data();
        
        // for(let page of snapshot ){
          // const page = snapshot.data();

          console.log(' ---- page --- ');
          console.log(page)

          if (!page) {
            // TODO: make here async, i.e. wait to display this until no response return. 
            this.content = '### This page does not exist';
            this.slug = undefined;
          } else {
            this.slug = slug;
            this.content = page.content;
            this.created = page.created;
            this.modified = page.modified;
          }
        
        // } // for



    });
  }
}