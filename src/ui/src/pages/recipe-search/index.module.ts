import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeSearchPage } from './index';

@NgModule({
    declarations: [
        RecipeSearchPage
    ],
    imports: [
        IonicPageModule.forChild(RecipeSearchPage)
    ],
    entryComponents: [
        RecipeSearchPage
    ]
})
export class RecipeSearchPageModule { }