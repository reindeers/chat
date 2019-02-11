import * as feedAction from '../actions/feed';
import * as userAction from '../actions/users';
import * as fromServices from './PusherService';
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap, takeUntil, tap} from "rxjs/internal/operators";
import {EMPTY, of} from "rxjs/index";

@Injectable()
export class FeedEffects {
  constructor(private actions$: Actions,
              private pusherService: fromServices.PusherService) {
  }

  @Effect()
  loadFeed$ = this.actions$.pipe(ofType(feedAction.LOAD_FEED),
    mergeMap((action: any) => {
      return this.pusherService.getFeedItems()
        .pipe(
          map(m => new feedAction.LoadFeedSuccess(m)),
          catchError(() => EMPTY) //todo
        )
    }));

  @Effect()
  addPost$ = this.actions$.pipe(
    ofType(feedAction.ADD_ONE),
    mergeMap((action: any) => this.pusherService.addPost(action.payload)
      .pipe(
        switchMap(m => [
          new feedAction.AddOneSuccess(m)]),
        catchError(() => EMPTY) //todo
      )
    )
  )

  @Effect()
  editPost$ = this.actions$.pipe(
    ofType(feedAction.EDIT_ONE),
    mergeMap((action: any) => this.pusherService.editPost(action.payload)
      .pipe(
        switchMap(m => [
          new feedAction.EditOneSuccess(m)]),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  deletePost = this.actions$.pipe(
    ofType(feedAction.DELETE_ONE),
    mergeMap((action: any) => this.pusherService.deletePost(action.payload)
      .pipe(
        switchMap(m => [
          new feedAction.DeleteOneSuccess(m.id)]),
        catchError(() => EMPTY)
      )
    )
  )
  @Effect()
  recoverPost = this.actions$.pipe(
    ofType(feedAction.RECOVER_ONE),
    mergeMap((action: any) => this.pusherService.recoverPost(action.payload)
      .pipe(
        switchMap(m => [
          new feedAction.RecoverOneSuccess(m.id)]),
        catchError(() => EMPTY)
      )
    )
  )

}
