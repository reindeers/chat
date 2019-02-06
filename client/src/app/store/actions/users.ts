import { Action } from '@ngrx/store';
import {User} from "../../model/User";

export const SELECT = '[Users] Select';
export const ADD_ONE = '[Users] Add One';
export const LOAD_USERS = '[Users] Load All';
export const LOAD_USERS_SUCCESS = '[Users] Load User Success';
export const LOAD_USERS_FAIL = '[Users] Load User Fail';
export const CHANGE_USER_SUCCESS = '[Users] Change User Success';

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: number){}
}

export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: User){}
}

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
  constructor(){}
}
export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User[]){}
}
export class ChangeUserSuccess implements Action {
  readonly type = CHANGE_USER_SUCCESS;
  constructor(){}
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;
  constructor(public payload: ExceptionInformation){}
}
export type Action = AddOne | Select | LoadUsers | LoadUsersFail | LoadUsersSuccess | ChangeUserSuccess;
