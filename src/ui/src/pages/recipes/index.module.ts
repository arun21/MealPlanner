import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesPage } from './index';

@NgModule({
    declarations: [
        RecipesPage
    ],
    imports: [
        IonicPageModule.forChild(RecipesPage)
    ],
    entryComponents: [
        RecipesPage
    ]
})
export class RecipesPageModule { }