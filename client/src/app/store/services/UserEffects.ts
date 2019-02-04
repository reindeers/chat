import * as fromRoot from '../../store/reducers';
import * as userAction from '../actions/users';
import * as fromServices from './PusherService';
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/internal/operators";
import {of} from "rxjs/index";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private pusherService: fromServices.PusherService) {
  }

  @Effect()
  loadUsers$ = this.actions$.pipe(ofType(userAction.LOAD_USERS),
    switchMap(() => {
      return this.pusherService.getUserItems()
        .pipe(
          map(users => new userAction.LoadUsersSuccess(users)),
          catchError(error => of(new userAction.LoadUsersFail(error)))
        )
    })
  )
}
