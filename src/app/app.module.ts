import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthRoutingModule } from './auth-routing.module';


const firebaseConfig = {
  apiKey: "AIzaSyA8uDBiuKh6xDfBVV4ZM6ZdIx2Tf28_2lw",
  authDomain: "myngwiki.firebaseapp.com",
  databaseURL: "https://myngwiki.firebaseio.com",
  projectId: "myngwiki",
  storageBucket: "myngwiki.appspot.com",
  messagingSenderId: "22899147088",
  appId: "1:22899147088:web:1ef707ccc0cb455bac6c55"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AuthRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
