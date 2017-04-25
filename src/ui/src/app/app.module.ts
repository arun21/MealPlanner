import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {MomentModule} from 'angular2-moment';

import { MyApp } from './app.component';
import { COMPONENTS } from '../components';
import { PAGES } from '../pages';
import { SERVICES } from '../services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    PAGES,
    COMPONENTS
  ],
  imports: [
    MomentModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
