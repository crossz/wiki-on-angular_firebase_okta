import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';


// export declare type FirebaseOptions = {
//   [key: string]: any;
// };

export var FirebaseOptionsToken = new InjectionToken('angularfire2.app.options')


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AngularFireModule {
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
        ngModule: AngularFireModule,
        providers: [
            { provide: FirebaseOptionsToken, useValue: options },
            // { provide: FirebaseNameOrConfigToken, useValue: nameOrConfig }
        ]
    };
  };


}