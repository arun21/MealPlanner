import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingPage } from './index';

@NgModule({
    declarations: [
        ShoppingPage
    ],
    imports: [
        IonicPageModule.forChild(ShoppingPage)
    ],
    entryComponents: [
        ShoppingPage
    ]
})
export class ShoppingPageModule { }