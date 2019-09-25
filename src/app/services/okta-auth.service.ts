import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OktaAuthService {

  constructor() { };

  isAuthenticated(): boolean {


    return true;
  };

  // Observable string sources
  private authenticationStateSource = new Subject<boolean>();
  $authenticationState = this.authenticationStateSource.asObservable();


  loginRedirect() {

  }


  logout() {
    
  }


  // private missionAnnouncedSource = new Subject<string>();
  // private missionConfirmedSource = new Subject<string>();

  // // Observable string streams
  // missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // // Service message commands
  // announceMission(mission: string) {
  //   this.missionAnnouncedSource.next(mission);
  // }

  // confirmMission(astronaut: string) {
  //   this.missionConfirmedSource.next(astronaut);
  // }


}
