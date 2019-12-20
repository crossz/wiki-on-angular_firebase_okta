import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from './services/page.service';
import { StoreModule } from '@ngrx/store';
import { pageReducer, optsReducer, snapshotReducer } from './reducers/page.reducer';

export var FirebaseOptionsToken = new InjectionToken('angularfire2.app.options')
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      snapshotState: snapshotReducer,
      pagesState: pageReducer,
      optsState: optsReducer
    }),
  ],
  providers: [
    {provide: 'pageService', useClass: PageService}
]
})
export class AngularFireModule {


  static initializeApp(options) {
    return {
        ngModule: AngularFireModule,
        providers: [
            { provide: FirebaseOptionsToken, useValue: options }
        ]
    };
  };


}
