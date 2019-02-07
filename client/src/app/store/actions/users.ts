import { Action } from '@ngrx/store';
import {User} from "../../model/User";

export const SELECT = '[Users] Select';
export const ADD_ONE = '[Users] Add One';
export const EDIT_ONE = '[Users] Edit One';
export const EDIT_ONE_SUCCESS = '[Users] Edit One Success';
export const LOAD_USERS = '[Users] Load All';
export const CHANGE_USER_SUCCESS = '[Users] Change User Success';

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: number){}
}

export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: User){}
}
export class EditOne implements Action {
  readonly type = EDIT_ONE;
  constructor(public payload: User){}
}
export class EditOneSuccess implements Action {
  readonly type = EDIT_ONE_SUCCESS;
  constructor(public payload: any){}
}
export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
  constructor(public payload: any){}
}
export class ChangeUserSuccess implements Action {
  readonly type = CHANGE_USER_SUCCESS;
  constructor(public payload: any){}
}
export type Action = AddOne | Select | LoadUsers | ChangeUserSuccess | EditOne;
