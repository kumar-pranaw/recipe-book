import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor( private router: Router) {

    }
    token: string;
    signUpUser(email: string,  password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
    }
    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                this.router.navigate(['/']),
                firebase.auth().currentUser.getIdToken().then(
                    (token: string) => this.token = token
                );
            },
            response => console.log(response)
        )
        .catch(
            error => console.log(error)
        );
    }
    getToken() {
         firebase.auth().currentUser.getIdToken().then(
        (token: string) => this.token = token
        );
        return this.token;
    }
    isAuthenticated() {
        return this.token != null;
    }
    logOut() {
        firebase.auth().signOut();
        this.router.navigate(['/signin']);
        this.token = null;
    }

}
