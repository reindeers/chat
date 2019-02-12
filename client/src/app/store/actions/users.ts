import {Action} from '@ngrx/store';
import {User} from "../../model/User";
import {HttpErrorResponse} from "@angular/common/http";

export const SELECT = '[Users] Select';
export const LOAD_USERS = '[Users] Load All';
export const LOAD_USERS_SUCCESS = '[Users] Load All Success';
export const LOAD_USERS_ERROR = '[Users] Load All Error';
export const SELECT_USER_SUCCESS = '[Users] Select User Success';
export const SELECT_USER_ERROR = '[Users] Select User Error';
export const INC_COUNTER = '[Users] Inc Counter';
export const DEC_COUNTER = '[Users] Dec Counter';
export const INC_COUNTER_SUCCESS = '[Users] Inc Counter Success';
export const DEC_COUNTER_SUCCESS = '[Users] Dec Counter Success';
export const INC_COUNTER_ERROR = '[Users] Inc Counter Error';
export const DEC_COUNTER_ERROR = '[Users] Dec Counter Error';

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: User) {
  }
}

export class SelectUserSuccess implements Action {
  readonly type = SELECT_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class SelectUserError implements Action {
  readonly type = SELECT_USER_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;

  constructor(public payload: User) {
  }
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoadUsersError implements Action {
  readonly type = LOAD_USERS_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export class IncCounter implements Action {
  readonly type = INC_COUNTER;

  constructor(public payload: number) {
  }
}

export class DecCounter implements Action {
  readonly type = DEC_COUNTER;

  constructor(public payload: number) {
  }
}

export class IncCounterSuccess implements Action {
  readonly type = INC_COUNTER_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DecCounterSuccess implements Action {
  readonly type = DEC_COUNTER_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DecCounterError implements Action {
  readonly type = DEC_COUNTER_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export class IncCounterError implements Action {
  readonly type = INC_COUNTER_ERROR;

  constructor(public payload: HttpErrorResponse) {
    console.error(payload);
  }
}

export type Action =
  Select
  | LoadUsers
  | LoadUsersSuccess
  | SelectUserSuccess
  | IncCounter
  | DecCounter
  | IncCounterSuccess
  | DecCounterSuccess
  | LoadUsersError
  | IncCounterError
  | DecCounterError
  | SelectUserError;
