import { Injectable } from '@angular/core';
import { default as firebase } from 'firebase';
import { default as config } from '../config';
import { User } from '../model';

@Injectable()
export class AuthenticationService {

    user: User;

    async authenticate(email: string, password: string): Promise<User> {

        this.user = 
            (config.stubMode)
                ? { uid: 'testuser' }
                : await firebase.auth().signInWithEmailAndPassword(email, password);
        
        return this.user;
    }

}