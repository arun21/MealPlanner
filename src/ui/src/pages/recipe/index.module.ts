import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipePage } from './index';

@NgModule({
    declarations: [
        RecipePage
    ],
    imports: [
        IonicPageModule.forChild(RecipePage)
    ],
    entryComponents: [
        RecipePage
    ]
})
export class RecipePageModule { }