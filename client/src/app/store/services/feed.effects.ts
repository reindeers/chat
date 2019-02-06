import * as feedAction from '../actions/feed';
import * as fromServices from './PusherService';
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap, tap} from "rxjs/internal/operators";
import {EMPTY, of} from "rxjs/index";

@Injectable()
export class FeedEffects {
  constructor(private actions$: Actions,
              private pusherService: fromServices.PusherService) {
  }

  @Effect()
  loadFeed$ = this.actions$.pipe(ofType(feedAction.LOAD_FEED),
    mergeMap(() => {
      return this.pusherService.getFeedItems()
        .pipe(
          map(m => new feedAction.LoadFeedSuccess(m)),
          catchError(() => EMPTY) //todo
        )
    }))

  @Effect()
  addPost$ =  this.actions$.pipe(
    ofType(feedAction.ADD_ONE),
    mergeMap(action =>  this.pusherService.addPost(action.payload)
        .pipe(
          map(m => new feedAction.AddOneSuccess()),
          catchError(() => EMPTY) //todo
        )
    )
  )
}
