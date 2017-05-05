import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home';
import { LoadingPage } from '../pages/loading';
import { AuthenticationService } from '../services/authentication-service';
import { default as config } from '../config';

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
    private auth: AuthenticationService
  ) {

    if(config.stubMode) {
      console.warn('STUB MODE')
    }
    
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authenticate('tester@test.com', 'P@SSw0rd!').then((user) => {

        if(user) {
          console.log(`User authenticated: ${user.uid}`)
          this.rootPage = HomePage;
        } else {
          // TODO: Error page
        }
      })
    })
  }

}
