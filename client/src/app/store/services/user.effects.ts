import * as userAction from '../actions/users';
import * as fromServices from './pusher.service';
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap} from "rxjs/internal/operators";
import {EMPTY, of} from "rxjs/index";
import {HttpErrorResponse} from "@angular/common/http";

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
          catchError((error: HttpErrorResponse) => of(new userAction.LoadUsersError(error)))
        )
    })
  );

  @Effect()
  changeUser$ = this.actions$.pipe(ofType(userAction.SELECT),
    switchMap((action: any) => this.pusherService.changeUser(action.payload)
      .pipe(
        map(user => new userAction.SelectUserSuccess(user)),
        catchError((error: HttpErrorResponse) => of(new userAction.SelectUserError(error)))
      )
    ));

  @Effect()
  decCounter$ = this.actions$.pipe(
    ofType(userAction.DEC_COUNTER),
    mergeMap((action: any) => this.pusherService.decCounter(action.payload)
      .pipe(
        map(m => new userAction.DecCounterSuccess(null)),
        catchError((error: HttpErrorResponse) => of(new userAction.DecCounterError(error)))
      )
    )
  );

  @Effect()
  incCounter$ = this.actions$.pipe(
    ofType(userAction.INC_COUNTER),
    mergeMap((action: any) => this.pusherService.incCounter(action.payload)
      .pipe(
        map(m => new userAction.IncCounterSuccess(null)),
        catchError((error: HttpErrorResponse) => of(new userAction.IncCounterError(error)))
      )
    )
  )
}
