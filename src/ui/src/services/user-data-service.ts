import { Injectable } from '@angular/core';
import { default as firebase } from 'firebase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseListFactoryOpts, FirebaseObjectFactoryOpts } from 'angularfire2/interfaces';

@Injectable()
export class UserDataService {

    constructor(private af: AngularFire) {
    }

    list(urlOrRef: string | firebase.database.Reference, opts?: FirebaseListFactoryOpts): FirebaseListObservable<any[]> {
        return this.af.database.list(this.userPath(urlOrRef), opts);
    }

    object(urlOrRef: string | firebase.database.Reference, opts?: FirebaseObjectFactoryOpts): FirebaseObjectObservable<any> {
        return this.af.database.object(this.userPath(urlOrRef), opts);
    }

    private userPath(urlOrRef: string | firebase.database.Reference) {
        if(typeof urlOrRef === "string") {
            let auth = firebase.auth();
            let user = auth && auth.currentUser;
            if(!user) throw 'User not authenticated'
            return `/users/${user.uid}${urlOrRef}`;
        }
        
        return urlOrRef;
    }

}