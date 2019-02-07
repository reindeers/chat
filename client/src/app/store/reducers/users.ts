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
      id: 1, name: "Вася", group: UserGroup.USER, counter: 0, lastLogin: new Date()
    },
    2: {
      id: 2, name: "Петя", group: UserGroup.USER, counter: 0, lastLogin: new Date()
    },
    3: {
      id: 3, name: "админ", group: UserGroup.ADMIN, counter: 0, lastLogin: new Date()
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
          console.log(user)
          console.log(action)
          if (id == user.id) return user;
          return state.users[id]
        })
      }
    }
    case userAction.SELECT: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      }
    }
    default: return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getUsers = (state: State) => state.users;
export const getSelected = (state: State) => state.selected;
