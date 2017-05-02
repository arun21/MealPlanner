import { Component, Input } from '@angular/core';

@Component({
    selector: 'main-nav',
    template: `
        <ion-navbar>
            <ion-title>{{title}}</ion-title>
        </ion-navbar>
    `
})
export class MainNav {
    @Input() title: string = 'BuffetBot';
}
