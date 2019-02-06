import * as userAction from '../actions/users';
import * as fromServices from './PusherService';
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap} from "rxjs/internal/operators";
import {EMPTY, of} from "rxjs/index";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private pusherService: fromServices.PusherService) {
  }

  /*@Effect()
  loadUsers$ = this.actions$.pipe(ofType(userAction.LOAD_USERS),
    switchMap(() => {
      return this.pusherService.getUserItems()
        .pipe(
          map(users => new userAction.LoadUsersSuccess(users)),
          catchError(error => of(new userAction.LoadUsersFail(error)))
        )
    })
  );*/

  @Effect()
  changeUser$ = this.actions$.pipe(ofType(userAction.SELECT),
    mergeMap((action) => this.pusherService.changeUser(action.payload)
        .pipe(
          map(user => new userAction.ChangeUserSuccess()), //todo select
          catchError(() => EMPTY)
        )
    ));
}
