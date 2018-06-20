import {Effect, Actions} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

@Injectable()

export class AuthEffects {
    @Effect()
    authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
        return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
        return [
            {type: AuthActions.SIGNUP},
            {type: AuthActions.SET_TOKEN, payload: token},
        ];
    });
                @Effect()
                authSignIn = this.actions$
                .ofType(AuthActions.TRY_SIGNIN)
                .map((action: AuthActions.TrySignup) => {
                    return action.payload;
                })
                .switchMap((authData: {username: string, password: string}) => {
                    return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
                })
                .switchMap(() => {
                    return fromPromise(firebase.auth().currentUser.getIdToken());
                })
                .mergeMap((token: string) => {
                    this.router.navigate(['/']);
                    return [
                        {type: AuthActions.SIGNIN},
                        {type: AuthActions.SET_TOKEN, payload: token},
                    ];
                });

    @Effect({dispatch: false})
    authLogout = this.actions$
    .ofType( AuthActions.LOGOUT)
    .do(() => {
this.router.navigate(['/']);
    });

    constructor(private actions$: Actions, private router: Router) {
    }
}
