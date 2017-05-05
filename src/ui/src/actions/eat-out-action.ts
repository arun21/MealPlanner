import { Injectable } from '@angular/core';
import { IAction } from './action';
import { ToastController } from "ionic-angular";


export interface EatOutActionParams {
    date: number;
}

@Injectable()
export class EatOutAction implements IAction<EatOutActionParams> {

    constructor(private toaster: ToastController) {
    }

    execute(params: EatOutActionParams): Promise<void> {
        const message = `Eating Out on ${new Date(params.date).toDateString()} (coming soon!)`;

        console.debug(message);

        this.toaster.create({ 
            message: message,
            duration: 2000,
            position: 'middle'
        }).present();

        return Promise.resolve();
    }

}