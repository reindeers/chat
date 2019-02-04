import { Action } from '@ngrx/store';
import {Feed} from "../../model/Feed";

export const SELECT = '[Feed] Select';
export const ADD_ONE = '[Feed] Add One';
export const EDIT_ONE = '[Feed] Edit One';
export const LOAD_FEED = '[Feed] Load All';
export const LOAD_FEED_SUCCESS = '[Feed] Load Feed Success';
export const LOAD_FEED_FAIL = '[Feed] Load Feed Fail';

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: number){}
}

export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: Feed){}
}

export class EditOne implements Action {
  readonly type = EDIT_ONE;
  constructor(public payload: Feed){}
}

export class LoadFeed implements Action {
  readonly type = LOAD_FEED;
  constructor(public payload: Feed[]){}
}
export class LoadFeedSuccess implements Action {
  readonly type = LOAD_FEED_SUCCESS;
  constructor(public payload: Feed[]){}
}

export class LoadFeedFail implements Action {
  readonly type = LOAD_FEED_FAIL;
  constructor(public payload: ExceptionInformation){}
}
export type Action = AddOne | Select | LoadFeed | LoadFeedFail | LoadFeedSuccess | EditOne;
