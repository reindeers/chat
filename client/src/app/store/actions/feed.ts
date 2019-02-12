import {Action} from '@ngrx/store';
import {Feed} from "../../model/Feed";
import {HttpErrorResponse} from "@angular/common/http";

export const ADD_ONE = '[Feed] Add One';
export const ADD_ONE_SUCCESS = '[Feed] Add One Success';
export const ADD_ONE_ERROR = '[Feed] Add One Error';
export const EDIT_ONE = '[Feed] Edit One';
export const EDIT_ONE_SUCCESS = '[Feed] Edit One Success';
export const EDIT_ONE_ERROR = '[Feed] Edit One Error';
export const LOAD_FEED = '[Feed] Load All';
export const LOAD_FEED_SUCCESS = '[Feed] Load Feed Success';
export const LOAD_FEED_ERROR = '[Feed] Load Feed Error';
export const DELETE_ONE = '[Feed] Delete One';
export const DELETE_ONE_SUCCESS = '[Feed] Delete One Success';
export const DELETE_ONE_ERROR = '[Feed] Delete One Error';
export const RECOVER_ONE = '[Feed] Recover One';
export const RECOVER_ONE_SUCCESS = '[Feed] Recover One Success';
export const RECOVER_ONE_ERROR = '[Feed] Recover One Error';

export class AddOne implements Action {
  readonly type = ADD_ONE;

  constructor(public payload: Feed) {
  }
}

export class AddOneSuccess implements Action {
  readonly type = ADD_ONE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddOneError implements Action {
  readonly type = ADD_ONE_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export class EditOne implements Action {
  readonly type = EDIT_ONE;

  constructor(public payload: Feed) {
  }
}

export class DeleteOne implements Action {
  readonly type = DELETE_ONE;

  constructor(public payload: Feed) {
  }
}

export class EditOneSuccess implements Action {
  readonly type = EDIT_ONE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteOneSuccess implements Action {
  readonly type = DELETE_ONE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditOneError implements Action {
  readonly type = EDIT_ONE_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export class DeleteOneError implements Action {
  readonly type = DELETE_ONE_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export class RecoverOne implements Action {
  readonly type = RECOVER_ONE;

  constructor(public payload: Feed) {
  }
}

export class RecoverOneSuccess implements Action {
  readonly type = RECOVER_ONE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class RecoverOneError implements Action {
  readonly type = RECOVER_ONE_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export class LoadFeed implements Action {
  readonly type = LOAD_FEED;

  constructor(public payload: Feed) {
  }
}

export class LoadFeedSuccess implements Action {
  readonly type = LOAD_FEED_SUCCESS;

  constructor(public payload: Feed) {
  }
}

export class LoadFeedError implements Action {
  readonly type = LOAD_FEED_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export type Action =
  AddOne
  | AddOneSuccess
  | AddOneError
  | LoadFeed
  | LoadFeedSuccess
  | EditOne
  | DeleteOne
  | EditOneSuccess
  | DeleteOneSuccess
  | RecoverOne
  | RecoverOneSuccess
  | EditOneError
  | RecoverOneError
  | LoadFeedError
  | DeleteOneError;
