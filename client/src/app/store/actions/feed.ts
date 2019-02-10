import { Action } from '@ngrx/store';
import {Feed} from "../../model/Feed";

export const ADD_ONE = '[Feed] Add One';
export const ADD_ONE_SUCCESS = '[Feed] Add One Success';
export const EDIT_ONE = '[Feed] Edit One';
export const EDIT_ONE_SUCCESS = '[Feed] Edit One Success';
export const LOAD_FEED = '[Feed] Load All';
export const LOAD_FEED_SUCCESS = '[Feed] Load Feed Success';
export const LOAD_FEED_FAIL = '[Feed] Load Feed Fail';
export const DELETE_ONE = '[Feed] Delete One';
export const DELETE_ONE_SUCCESS = '[Feed] Delete One Success';
export const RECOVER_ONE = '[Feed] Recover One';
export const RECOVER_ONE_SUCCESS = '[Feed] Recover One Success';

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

export class DeleteOne implements Action {
  readonly type = DELETE_ONE;
  constructor(public payload: any){}
}

export class EditOneSuccess implements Action {
  readonly type = EDIT_ONE_SUCCESS;
  constructor(public payload: Feed){}
}

export class DeleteOneSuccess implements Action {
  readonly type = DELETE_ONE_SUCCESS;
  constructor(public payload: any){}
}

export class RecoverOne implements Action {
  readonly type = RECOVER_ONE;
  constructor(public payload: any)
}
export class RecoverOneSuccess implements Action {
  readonly type = RECOVER_ONE_SUCCESS;
  constructor(public payload: number)
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
export type Action = AddOne | LoadFeed | LoadFeedFail | LoadFeedSuccess | EditOne | DeleteOne | AddOneSuccess | EditOneSuccess | DeleteOneSuccess | RecoverOne | RecoverOneSuccess;
