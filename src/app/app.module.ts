import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditComponent } from './edit/edit.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MarkdownModule } from 'ngx-markdown';


import { OktaAuthService } from './services/okta-auth.service';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA8uDBiuKh6xDfBVV4ZM6ZdIx2Tf28_2lw",
  authDomain: "myngwiki.firebaseapp.com",
  databaseURL: "https://myngwiki.firebaseio.com",
  projectId: "myngwiki",
  storageBucket: "myngwiki.appspot.com",
  messagingSenderId: "22899147088",
  appId: "1:22899147088:web:1ef707ccc0cb455bac6c55"
  // ,
  // 'PRIVATE-TOKEN': "zx8Z3TR3BtapdzvWG_eA"
  // ,
  // PRIVATETOKEN: "zx8Z3TR3BtapdzvWG_eA",
  // GITLABAPIURL: "https://gitlab.com/api/v4"
};

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AuthRoutingModule,
    // HomeModule,
    MarkdownModule.forRoot()
  

  ],
  // this is to make these services singleton, so the variables shared between parent and children components could be persisted except refreshing the SPA. In the cose of persisting during refreshing pages, localStorage etc have to be implemented.
  providers: [OktaAuthService], 
  
  bootstrap: [AppComponent]
})
export class AppModule { }
