import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from './services/page.service';
import { StoreModule } from '@ngrx/store';
import { pageReducer, optsReducer } from './reducers/page.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      pages: pageReducer,
      opts: optsReducer
    }),
  ],
  providers: [
    {provide: 'pageService', useClass: PageService}
]
})
export class AngularFireModule {
}
