import * as userAction from '../actions/users';
import * as fromServices from './PusherService';
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap} from "rxjs/internal/operators";
import {EMPTY, of} from "rxjs/index";
import * as feedAction from "../actions/feed";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private pusherService: fromServices.PusherService) {
  }

  @Effect()
  loadUsers$ = this.actions$.pipe(ofType(userAction.LOAD_USERS),
    switchMap((action: any) => {
      return this.pusherService.getUserItems()
        .pipe(
          map(users => new userAction.LoadUsersSuccess(users)),
          catchError(() => EMPTY) //todo
        )
    })
  );

  @Effect()
  changeUser$ = this.actions$.pipe(ofType(userAction.SELECT),
    switchMap((action : any) => this.pusherService.changeUser(action.payload)
        .pipe(
          switchMap(user => [
            new userAction.SelectUserSuccess(user)
          ]),
          catchError(() => EMPTY)
        )
    ));

  @Effect()
  decCounter = this.actions$.pipe(
    ofType(userAction.DEC_COUNTER),
    mergeMap((action: any) => this.pusherService.decCounter(action.payload)
      .pipe(
        switchMap(m => [
          new userAction.DecCounter(null)]),
        catchError(() => EMPTY)
      )
    )
  )

  @Effect()
  incCounter = this.actions$.pipe(
    ofType(userAction.INC_COUNTER),
    mergeMap((action: any) => this.pusherService.incCounter(action.payload)
      .pipe(
        switchMap(m => [
          new userAction.IncCounter(null)]),
        catchError(() => EMPTY)
      )
    )
  )
}
