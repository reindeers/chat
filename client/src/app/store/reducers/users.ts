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
  selected: null

};

export function reducer(state = initialState, action: userAction.Action) : State{
  switch(action.type){
    case userAction.ADD_ONE: {
      const newUser: User = action.payload;
      return{
        ...state,
        ids: [...state.ids, newUser.id],
        users: {...state.users, [newUser.id]: newUser}
      };
    }
    case userAction.EDIT_ONE: {
      const user = action.payload;
      return {
        ...state,
        users: state.ids.map(id => {
          if (id == user.id) return user;
          return state.users[id]
        })
      }
    }
    case userAction.EDIT_LAST_LOGIN: {
      const id = action.payload;
      return {
        ...state,
        users: state.ids.map(id0 => {
          if (id0 == id) {
            let user = state.users[id];
            user.lastLogin = new Date();
            return user
          };
          return state.users[id0]
        })
      }
    }
    case userAction.SELECT_USER_SUCCESS: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      }
    }
    case userAction.SET_NULL_COUNTER: {
      const id = action.payload;
      return {
        ...state,
        users: state.ids.map(id0 => {
          if (id0 == id) {
            let user = state.users[id];
            user.counter = 0;
            return user
          };
          return state.users[id0]
        })
      }
    }
    case userAction.INC_COUNTER: {
      const id = action.payload;
      return {
        ...state,
        users: state.ids.map(id0 => {
          if (id0 != id) {
            let user = state.users[id0];
            user.counter++;
            return user
          };
          return state.users[id0]
        })
      }
    }
    case userAction.DEC_COUNTER: {
      const id = action.payload;
      return {
        ...state,
        users: state.ids.map(id0 => {
          if (id0 != id) {
            let user = state.users[id0];
            user.counter--;
            return user
          };
          return state.users[id0]
        })
      }
    }
    default: return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getUsers = (state: State) => state.users;
export const getSelected = (state: State) => state.selected;
