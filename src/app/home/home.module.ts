import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { HomeComponent } from './home.component';
import { AngularFireModule } from '../gwa/gwa-store.module';
import { AngularFirestore } from '../gwa/gwa-store.service';


const firebaseConfig = {
  'PRIVATE-TOKEN': "zx8Z3TR3BtapdzvWG_eA"
  ,
  PRIVATETOKEN: "zx8Z3TR3BtapdzvWG_eA",
  GITLABAPIURL: "https://gitlab.com/api/v4/projects/"
};



@NgModule({
  declarations: [HomeComponent],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
   CommonModule,
   MarkdownModule.forChild(),
   RouterModule.forChild([{ path: '', component: HomeComponent }])
  ],
  providers: [AngularFirestore]
})
export class HomeModule {}
