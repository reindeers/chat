import {User, UserGroup} from "../../model/User";
import * as userAction from '../actions/users';

export interface State {
  ids: number[];
  users: {[id: number]: User};
  selected: number;
}

export const initialState: State = {
  ids: [0, 1, 2],
  users: {
    0: {
      id: 0, name: "Вася", group: UserGroup.USER, counter: 0, lastLogin: new Date()
    },
    1: {
      id: 1, name: "Петя", group: UserGroup.USER, counter: 0, lastLogin: new Date()
    },
    2: {
      id: 2, name: "админ", group: UserGroup.ADMIN, counter: 0, lastLogin: new Date()
    }
  },
  selected: 0

};

export function reducer(state = initialState, action: userAction.Action) : State{
  switch(action.type){
    case userAction.SELECT_USER_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        selected: user.id
      }
    }
    case userAction.SELECT:
    case userAction.INC_COUNTER:
    case userAction.DEC_COUNTER:
    case userAction.INC_COUNTER_SUCCESS:
    case userAction.DEC_COUNTER_SUCCESS: {
      return {
        ...state
      }
    }
    case userAction.LOAD_USERS_SUCCESS: {
      const user: User = action.payload;
      return{
        ...state,
        users: state.ids.filter(id => id == user.id).length > 0
          ? state.ids.map(id => {
            if (id == user.id) return user;
            else return state.users[id];
          })
          : {...state.users, [user.id]: user}
      }

    }
    default: return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getUsers = (state: State) => state.users;
export const getSelected = (state: State) => state.selected;
