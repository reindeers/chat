import { ActionReducerMap, createSelector, createFeatureSelector,
  ActionReducer, MetaReducer } from '@ngrx/store';

import * as fromUsers from './users';
import * as fromFeed from './feed';
import {Feed} from "../../model/Feed";

export interface State {
  users: fromUsers.State,
  feed: fromFeed.State
}

export const reducers: ActionReducerMap<State> = {
  users: fromUsers.reducer,
  feed: fromFeed.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State>{
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<State>[] = [logger];

export const getUserState =
  createFeatureSelector<fromUsers.State>('users');

export const getIds= createSelector(
  getUserState,
  fromUsers.getIds
)

export const getUsers = createSelector(
  getUserState,
  fromUsers.getUsers
)

export const getSelected = createSelector(
  getUserState,
  fromUsers.getSelected
)

export const getSelectUser = createSelector(
  getSelected,
  getUsers,
  (id, users) =>{
    return {
      ...users[id]
    }
  }
);

export const getAllUsers = createSelector(
  getIds,
  getUsers,
  (ids, users) => {
    return ids.map(id => users[id]);
  }
);

export const getFeedState =
  createFeatureSelector<fromFeed.State>('feed');

export const getFeed = createSelector(
  getFeedState,
  fromFeed.getFeed
);

export const getAllFeed = createSelector(
  getFeed,
  (feed : Feed[]) => feed
);
