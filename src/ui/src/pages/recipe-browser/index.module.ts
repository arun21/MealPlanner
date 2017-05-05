import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeBrowserPage } from './index';

@NgModule({
    declarations: [
        RecipeBrowserPage
    ],
    imports: [
        IonicPageModule.forChild(RecipeBrowserPage)
    ],
    entryComponents: [
        RecipeBrowserPage
    ]
})
export class RecipeBrowserPageModule { }