import { Injectable } from '@angular/core';
import { default as firebase } from 'firebase';
import { User } from '../model';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class UserStore extends BehaviorSubject<User> {

    static AnonymousUser: User = { uid: null, displayName: 'Anonymous', email: 'anonymous', photoURL: null };

    private auth: firebase.auth.Auth;

    constructor() {
        super(null);
        this.auth = firebase.auth();
        this.initialize();
    }

    authenticate(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    initialize() {
        if(this.auth.currentUser) {
            this.next(this.auth.currentUser);
            return;
        }
        
        this.auth.onAuthStateChanged(user => {
            this.next(user);
        });

    }

}