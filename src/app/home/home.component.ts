import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// import { OktaAuthService } from '@okta/okta-angular';
import { OktaAuthService } from '../services/okta-auth.service';


// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '../services/gwa-store.service';
import { FirebaseOptionsToken } from '../modules/gwa-module/gwa-module.module';

// import { DocumentSnapshot } from '@firebase/firestore-types';

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
              @Inject(FirebaseOptionsToken) fbConfig: any
              ) {
                this._config = fbConfig;
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


    console.log('----==== _config: ====----');
    console.log(this._config);



    if (this.subs) {
      this.subs.unsubscribe();
    }

    // const doc = this.db.collection('pages').doc(slug).get();
    const doc = this.db.collection('pages').doc(slug).get();

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







    
    this.subs = doc.subscribe((snapshot) => {
      console.log('----==== snaphot: ' + snapshot);
      const page = snapshot.data();
      if (!page) {
        this.content = '### This page does not exist';
        this.slug = undefined;
      } else {
        this.slug = slug;
        this.content = page.content;
        this.created = page.created;
        this.modified = page.modified;
        console.log(page);
      }
    });


  }
}