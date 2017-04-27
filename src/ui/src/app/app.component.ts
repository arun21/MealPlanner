import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SchedulePage } from '../pages/schedule';
import { LoadingPage } from '../pages/loading';
import { default as firebase } from 'firebase';
import { AngularFire } from 'angularfire2';

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
    private af: AngularFire
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.authenticate().then((user) => {

        if(user) {
          console.log(`User authenticated: ${user.uid}`)
          this.rootPage = SchedulePage;
        }

        this.statusBar.styleDefault();
        this.splashScreen.hide();
      })
    })
  }

  authenticate() {

      return firebase.auth()
        .signInWithEmailAndPassword('tester@test.com', 'P@SSw0rd!')
        .catch(err => console.error(err))
  }
}
