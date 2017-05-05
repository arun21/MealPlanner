import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { AngularFireModule } from 'angularfire2';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SafePipe } from './safe-pipe';
import { MyApp } from './app.component';
import { COMPONENTS } from '../components';
import { PAGES } from '../pages';
import { SERVICES } from '../services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig = {
  apiKey: "AIzaSyAf5Vb7N3nF0Nxb1Qy_A2ojYQWZHihziKQ",
  authDomain: "buffetbot-1733f.firebaseapp.com",
  databaseURL: "https://buffetbot-1733f.firebaseio.com",
  projectId: "buffetbot-1733f",
  storageBucket: "buffetbot-1733f.appspot.com",
  messagingSenderId: "971436743545"
};


@NgModule({
  declarations: [
    MyApp,
    PAGES,
    COMPONENTS,
    SafePipe
  ],
  imports: [
    MomentModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PAGES
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SERVICES,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
