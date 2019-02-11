import { Action } from '@ngrx/store';
import {User} from "../../model/User";

export const SELECT = '[Users] Select';
export const ADD_ONE = '[Users] Add One';
export const EDIT_ONE = '[Users] Edit One';
export const EDIT_LAST_LOGIN = '[Users] Edit User Data';
export const EDIT_ONE_SUCCESS = '[Users] Edit One Success';
export const LOAD_USERS = '[Users] Load All';
export const LOAD_USERS_SUCCESS = '[Users] Load All Success';
export const SELECT_USER_SUCCESS = '[Users] Select User Success';
export const SET_NULL_COUNTER = '[Users] Set Null Counter';
export const INC_COUNTER = '[Users] Inc Counter';
export const DEC_COUNTER = '[Users] Dec Counter';

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: User){}
}

export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: User){}
}
export class EditOne implements Action {
  readonly type = EDIT_ONE;
  constructor(public payload: User){}
}
export class EditLastLogin implements Action {
  readonly type = EDIT_LAST_LOGIN;
  constructor(public payload: number){}
}
export class EditOneSuccess implements Action {
  readonly type = EDIT_ONE_SUCCESS;
  constructor(public payload: any){}
}
export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
  constructor(public payload: User){}
}
export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User){}
}
export class SelectUserSuccess implements Action {
  readonly type = SELECT_USER_SUCCESS;
  constructor(public payload: User){}
}
export class SetNullCounter implements Action {
  readonly type = SET_NULL_COUNTER;
  constructor(public payload: number){}
}
export class IncCounter implements Action {
  readonly type = INC_COUNTER;
  constructor(public payload: any){}
}

export class DecCounter implements Action {
  readonly type = DEC_COUNTER;
  constructor(public payload: any){}
}
export type Action = AddOne | Select | LoadUsers | LoadUsersSuccess | SelectUserSuccess | EditOne | EditLastLogin | SetNullCounter | IncCounter | DecCounter;
