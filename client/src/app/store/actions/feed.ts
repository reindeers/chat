import { Action } from '@ngrx/store';
import {Feed} from "../../model/Feed";

export const ADD_ONE = '[Feed] Add One';
export const ADD_ONE_SUCCESS = '[Feed] Add One Success';
export const EDIT_ONE = '[Feed] Edit One';
export const LOAD_FEED = '[Feed] Load All';
export const LOAD_FEED_SUCCESS = '[Feed] Load Feed Success';
export const LOAD_FEED_FAIL = '[Feed] Load Feed Fail';

export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: Feed){}
}

export class AddOneSuccess implements Action {
  readonly type = ADD_ONE_SUCCESS;
  constructor(public payload: any){}
}

export class EditOne implements Action {
  readonly type = EDIT_ONE;
  constructor(public payload: Feed){}
}

export class LoadFeed implements Action {
  readonly type = LOAD_FEED;
  constructor(public payload: any){}
}
export class LoadFeedSuccess implements Action {
  readonly type = LOAD_FEED_SUCCESS;
  constructor(public payload: Feed){}
}

export class LoadFeedFail implements Action {
  readonly type = LOAD_FEED_FAIL;
  constructor(public payload: ExceptionInformation){}
}
export type Action = AddOne | LoadFeed | LoadFeedFail | LoadFeedSuccess | EditOne | AddOneSuccess;
