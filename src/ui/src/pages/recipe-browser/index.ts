import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'recipe-browser-page',
  template: `
    <ion-header no-border>
      <ion-toolbar>
        <ion-title>Recipe Browser</ion-title>
        <ion-buttons end>
          <button ion-button navPop>Done</button>
          <button ion-button (click)="addRecipe()">Add</button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content overflow-scroll="true">
        <div #browser></div>
    </ion-content>
  `
})
export class RecipeBrowserPage {
  @ViewChild('browser') browser: HTMLIFrameElement;

  url: string = '';

  constructor(
    private navParams: NavParams, 
    private inAppBrowser: InAppBrowser
  ) {
    this.url = navParams.get("url") || 'http://www.allrecipes.com';
    
    const browserWindow = inAppBrowser.create('http://www.allrecipes.com', '#browser');
browserWindow.on('loadstop').subscribe(evt => {
  console.log('loadstop: ', evt.url)
})

  }

  addRecipe() {
    console.debug(`addRecipe: ${this.url}`);
  }

  onNavigated(url) {
    console.debug('onNavigated: ', url);
  }

}
