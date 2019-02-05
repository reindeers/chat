import {User, UserGroup} from "../../model/User";
import * as userAction from '../actions/users';

export interface State {
  ids: number[];
  users: {[id: number]: User};
  selected: number;
}

export const initialState: State = {
  ids: [1, 2, 3],
  users: {
    1: {
      id: 1, name: "Вася", group: UserGroup.USER
    },
    2: {
      id: 2, name: "Петя", group: UserGroup.USER
    },
    3: {
      id: 3, name: "админ", group: UserGroup.ADMIN
    }
  },
  selected: null

};

export function reducer(state = initialState, action: userAction.Action){
  switch(action.type){
    case userAction.ADD_ONE: {
      const newUser: User = action.payload;
      return{
        ...state,
        ids: [...state.ids, newUser.id],
        users: {...state.ids, newUser}
      };
    }
    case userAction.CHANGE_USER_SUCCESS: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      }
    }
    case userAction.LOAD_USERS_SUCCESS: {
      const users: User[] = action.payload;
      return{
        ...state,
        ids: [...users.map(u => u.id)],
        users: {...users.map(u => u.id), users}
      };

    }
    case userAction.LOAD_USERS_FAIL: {
      return{
        ...state,
        ids: [],
        users: []
      }
    }
    default: return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getUsers = (state: State) => state.users;
export const getSelected = (state: State) => state.selected;
