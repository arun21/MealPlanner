import * as Raven from 'raven-js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from "@angular/core";

import { AppModule } from './app.module';
import {default as config, Environment } from '../config';


if(config.environment == Environment.Production) {
    Raven
    .config(config.sentryIo.dsn, config.sentryIo.options)
    .install();

    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
