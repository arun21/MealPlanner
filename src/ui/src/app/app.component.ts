import * as Raven from 'raven-js';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home';
import { LoadingPage } from '../pages/loading';
import { UserStore } from '../services/user-store';
import { SchedulesStore } from '../services/schedules-store';

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
    private schedules: SchedulesStore
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.user.subscribe((user) => {

        if(!user) return;

        console.log(`User authenticated: ${user.uid}`)

        Raven.setUserContext({
          id: user.uid,
          email: user.email,
          username: user.displayName,
        });

        this.rootPage = HomePage;
        
      })

      this.user.authenticate('tester@test.com', 'P@SSw0rd!');
    })
  }

}
