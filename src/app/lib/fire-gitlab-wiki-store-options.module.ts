import { NgModule, InjectionToken } from '@angular/core';

export var FirebaseOptionsToken = new InjectionToken('angularfire2.app.options')

@NgModule({
  declarations: [],
  imports: []
})
export class AngularFireOptionsModule {
  // static initializeApp(options: FirebaseOptions, nameOrConfig?: string | FirebaseAppConfig): {
  //   ngModule: typeof AngularFireModule;
  //   providers: {
  //       provide: InjectionToken<string | FirebaseAppConfig | undefined>;
  //       useValue: string | FirebaseAppConfig | undefined;
  //   }[];
  // };

  // static AngularFireModule_1: any = AngularFireModule;

  static initializeApp(options) {
    return {
        ngModule: AngularFireOptionsModule,
        providers: [
            { provide: FirebaseOptionsToken, useValue: options }
        ]
    };
  };
}