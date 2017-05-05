import { Injectable } from '@angular/core';
import { IAction } from './action';
import { ToastController } from "ionic-angular";

export interface ReplaceMealActionParams {
    date: number;
}

@Injectable()
export class ReplaceMealAction implements IAction<ReplaceMealActionParams> {

    constructor(private toaster: ToastController) {
    }

    execute(params: ReplaceMealActionParams): Promise<void> {
        const message = `Replaced meal ${new Date(params.date).toDateString()} (coming soon!)`;

        console.debug(message);

        this.toaster.create({ 
            message: message,
            duration: 2000,
            position: 'middle'
        }).present();

        return Promise.resolve();
    }

}
