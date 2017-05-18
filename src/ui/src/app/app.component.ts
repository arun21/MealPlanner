import * as Raven from 'raven-js';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home';
import { LoadingPage } from '../pages/loading';
import { UserStore } from '../services/user-store';
import { LoginPage } from "../pages/login";

@Component({
  template: `<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoadingPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private user: UserStore,
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.user.subscribe((user) => {

        if(user && user.uid) {
          console.log(`User authenticated: ${user.uid}`)

          Raven.setUserContext({
            id: user.uid,
            email: user.email,
            username: user.displayName,
          });

          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
  }

}
