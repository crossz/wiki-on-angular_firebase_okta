import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from './services/page.service';
import { StoreModule } from '@ngrx/store';
import { pageReducer, optsReducer, snapshotReducer } from './reducers/page.reducer';

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
}
