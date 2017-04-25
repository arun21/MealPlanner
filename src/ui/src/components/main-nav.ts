import { Component, Input } from '@angular/core';

@Component({
    selector: 'main-nav',
    template: `
        <ion-navbar>
            <button ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title>{{title}}</ion-title>
        </ion-navbar>
    `
})
export class MainNav {
    @Input() title: string = 'BuffetBot';
}
