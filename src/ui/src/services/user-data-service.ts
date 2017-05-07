import { Injectable } from '@angular/core';
import { default as firebase } from 'firebase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseListFactoryOpts, FirebaseObjectFactoryOpts } from 'angularfire2/interfaces';

@Injectable()
export class UserDataService {

    constructor(private af: AngularFire) {
    }

    list<T>(urlOrRef: string | firebase.database.Reference, opts?: FirebaseListFactoryOpts): FirebaseListObservable<T[]> {
        return this.af.database.list(this.userPath(urlOrRef), opts);
    }

    object<T>(urlOrRef: string | firebase.database.Reference, opts?: FirebaseObjectFactoryOpts): FirebaseObjectObservable<T> {
        return this.af.database.object(this.userPath(urlOrRef), opts);
    }

    private userPath(urlOrRef: string | firebase.database.Reference) {
        if(typeof urlOrRef === "string") {
            let user = firebase.auth().currentUser;
            if(!user) throw 'User not authenticated!';
            return `/users/${user.uid}${urlOrRef}`;
        }
        
        return urlOrRef;
    }

}