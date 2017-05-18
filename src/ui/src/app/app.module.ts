import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { AngularFireModule } from 'angularfire2';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { default as firebase } from 'firebase';

import { SafePipe } from './safe-pipe';
import { MyApp } from './app.component';
import { COMPONENTS } from '../components';
import { PAGES } from '../pages';
import { ACTIONS } from '../actions';
import { SERVICES } from '../services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {default as config } from '../config';

firebase.initializeApp(config.firebase);

Raven
  .config(config.sentryIo.dsn, config.sentryIo.options)
  .install();

export class RavenErrorHandler extends IonicErrorHandler  {
  handleError(err:any) : void {
    Raven.captureException(err.originalError || err);
  }
}

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
    AngularFireModule.initializeApp(config.firebase),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PAGES
  ],
  providers: [
    ACTIONS,
    StatusBar,
    SplashScreen,
    SERVICES,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
