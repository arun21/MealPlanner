import * as Raven from 'raven-js';
import { Injectable } from '@angular/core';
import { default as firebase } from 'firebase';
import { User } from '../model';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class UserStore extends BehaviorSubject<User> {

    constructor() {
        super(null);
    }

    async authenticate(email: string, password: string): Promise<void> {
        firebase.auth().onAuthStateChanged(user => {
            this.next(user);
        });

        firebase.auth().signInWithEmailAndPassword(email, password).catch(e => 
            Raven.captureException(e)
        );
;
    }

}