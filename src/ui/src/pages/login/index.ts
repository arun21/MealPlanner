import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UserStore } from '../../services/user-store';

@IonicPage()
@Component({
  selector: 'login-page',
  template: `
    <ion-header no-border>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
          <button ion-item *ngFor="let user of users" (click)="loginAs(user)">
              <ion-icon item-left name="contact"></ion-icon>
              <ion-label text-wrap>{{ user.displayName }}</ion-label>
          </button>
        </ion-list>
    </ion-content>
  `
})
export class LoginPage {

  users: LoginUser[] = [
    { displayName: 'Test User', email:'tester@test.com', password: 'P@SSw0rd!' },
    { displayName: 'Jesse', email:'jesschadwick@gmail.com', password: 'P@SSw0rd!' },
    { displayName: 'Leah', email:'leahchadwick@gmail.com', password: 'P@SSw0rd!' },
    { displayName: 'Rachel', email:'racheleaster@gmail.com', password: 'P@SSw0rd!' },
  ];

  constructor(private auth: UserStore) {
  }

  loginAs(user: LoginUser) {
    this.auth.authenticate(user.email, user.password)
      .catch(e => { throw 'Unable to login!' });
  }

}

export interface LoginUser {
  displayName?: string;
  email: string;
  password: string;
}
