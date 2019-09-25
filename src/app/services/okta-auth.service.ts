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
    this.authenticated = false;
  };

  // Service message commands
  announceMission(authenticated: boolean) {
    this.authenticationStateSource.next(authenticated);
  }


  isAuthenticated() {
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
