import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MarkdownModule } from 'ngx-markdown';

import { AuthRoutingModule } from './auth-routing.module';
import { EditComponent } from './edit/edit.component';
import { HomeModule} from './home/home.module';

/**
 * Obsolete dependencies.
 */
// import { OktaAuthService } from './services/okta-auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
////////////////////


import { AngularFireModule } from './lib/fire-gitlab-wiki-store.module'; // for dev and test purpose
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireModule } from 'fire-gitlab-wiki-store';



const firebaseConfig = {
  apiKey: "AIzaSyA8uDBiuKh6xDfBVV4ZM6ZdIx2Tf28_2lw",
  authDomain: "myngwiki.firebaseapp.com",
  databaseURL: "https://myngwiki.firebaseio.com",
  projectId: "myngwiki",
  storageBucket: "myngwiki.appspot.com",
  messagingSenderId: "22899147088",
  appId: "1:22899147088:web:1ef707ccc0cb455bac6c55"
  ,
  'PRIVATE-TOKEN': "zx8Z3TR3BtapdzvWG_eA"
  ,
  PRIVATETOKEN: "zx8Z3TR3BtapdzvWG_eA",
  GITLABAPIURL: "https://gitlab.com/api/v4/projects/"
};

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    
    MarkdownModule.forRoot(),
    HomeModule,


    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
    

  ],
  // this is to make these services singleton, so the variables shared between parent and children components could be persisted except refreshing the SPA. In the case of persisting during refreshing pages, localStorage etc have to be implemented.
  // providers: [OktaAuthService], 
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
