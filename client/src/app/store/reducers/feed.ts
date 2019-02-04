import {Feed, FeedStatus} from "../../model/Feed";
import * as feedAction from '../actions/feed';

export interface State {
  ids: number[];
  feed: {[id: number]: Feed};
  selected: number;
}

export const initialState: State = {
  ids: [1, 2, 3],
  feed: {
    1: {
      id: 1, author: "Вася", status: FeedStatus.ACTIVE, //todo: author - link to id not to string name
      content: "Всем привет", createdAt: new Date()
    },
    2: {
      id: 2, author: "Петя", status: FeedStatus.ACTIVE,
      content: "Всем привет0", createdAt: new Date()
    },
    3: {
      id: 3, author: "админ", status: FeedStatus.DELETED,
      content: "Всем привет1", createdAt: new Date()
    }
  },
  selected: null

};

export function reducer(state = initialState, action: feedAction.Action){
  switch(action.type){
    case feedAction.ADD_ONE: {
      const newFeed: Feed = action.payload;
      return{
        ...state,
        ids: [...state.ids, newFeed.id],
        feed: {...state.ids, newFeed}
      };
    }
    case feedAction.EDIT_ONE: { //todo
      const editFeed: Feed = action.payload;
      return{
        ...state,
        ids: [...state.ids, editFeed.id],
        feed: {...state.ids, editFeed}
      };
    }
    case feedAction.SELECT: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      }
    }
    case feedAction.LOAD_FEED_SUCCESS: {
      const feed: Feed[] = action.payload;
      return{
        ...state,
        ids: [...feed.map(u => u.id)],
        feed: {...feed.map(u => u.id), feed}
      };

    }
    case feedAction.LOAD_FEED_FAIL: {
      return{
        ...state,
        ids: [],
        feed: []
      }
    }
    default: return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getFeed = (state: State) => state.feed;
export const getSelected = (state: State) => state.selected;
