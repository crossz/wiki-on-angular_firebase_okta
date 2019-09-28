import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OktaAuthService {

  private authenticated: boolean;
  // Observable string sources
  private authenticationStateSource = new Subject<boolean>();
  $authenticationState = this.authenticationStateSource.asObservable();
  
  constructor() {

  };

  async ngOnInit() {

  }


  // Service message commands
  announceMission(authenticated: boolean) {
    this.authenticationStateSource.next(authenticated);
  }

    // OKTA using localStorage to store the local and remote tokens, this is from their official github README.md.
    // /** OKTA source code on github: https://github.com/okta/okta-oidc-js/blob/master/packages/okta-angular/src/okta/services/okta.service.ts
    // 
    //  * Checks if there is an access token and id token
    //  */
    // async isAuthenticated(): Promise<boolean> {
    //   const accessToken = await this.getAccessToken()
    //   const idToken = await this.getIdToken()
    //   return !!(accessToken || idToken);
    // }
    //
    // /**
    //  * Returns the current accessToken in the tokenManager.
    //  */
    // async getAccessToken(): Promise<string | undefined>  {
    //   try {
    //     const accessToken = await this.oktaAuth.tokenManager.get('accessToken');
    //     return accessToken.accessToken;
    //   } catch (err) {
    //     // The user no longer has an existing SSO session in the browser.
    //     // (OIDC error `login_required`)
    //     // Ask the user to authenticate again.
    //     return undefined;
    //   }
    // }
    //
    // /**
    //  * Returns the current idToken in the tokenManager.
    //  */
    // async getIdToken(): Promise<string | undefined> {
    //   try {
    //     const idToken = await this.oktaAuth.tokenManager.get('idToken');
    //     return idToken.idToken;
    //   } catch (err) {
    //     // The user no longer has an existing SSO session in the browser.
    //     // (OIDC error `login_required`)
    //     // Ask the user to authenticate again.
    //     return undefined;
    //   }
    // }
  isAuthenticated() {
    this.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.authenticated = isAuthenticated
    );
    return this.authenticated;
  };


  loginRedirect() {
    this.announceMission(true);
    // this.authenticated = true;
  }
  
  logout() {
    this.announceMission(false);
    // this.authenticated = false;
  }

}
