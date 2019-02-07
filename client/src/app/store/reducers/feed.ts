import {Feed, FeedStatus} from "../../model/Feed";
import * as feedAction from '../actions/feed';

export interface State {
  feed: Feed[];
}

export const initialState: State = {
  feed: [
    {
      id: 1, author: "Вася", status: FeedStatus.ACTIVE, //todo: author - link to id not to string name
      content: "Всем привет", createdAt: new Date()
    },
    {
      id: 2, author: "Петя", status: FeedStatus.ACTIVE,
      content: "Всем привет0", createdAt: new Date()
    },
    {
      id: 3, author: "админ", status: FeedStatus.DELETED,
      content: "Всем привет1", createdAt: new Date()
    }
  ]
};

export function reducer(state = initialState, action: feedAction.Action) : State{
  switch(action.type){
    case feedAction.ADD_ONE: {
      const newFeed: Feed = action.payload;
      return{
        ...state,
        feed: [...state.feed, newFeed]
      };
    }
    case feedAction.ADD_ONE_SUCCESS: {
      return{
        ...state
      };
    }
    case feedAction.EDIT_ONE: { //todo
      const editFeed: Feed = action.payload;
      return{
        ...state,
        feed: [...state.feed, editFeed]
      };
    }
    case feedAction.LOAD_FEED_SUCCESS: {
      /*const feed: Feed[] = action.payload;
      return{
        ...state,
        feed: {...feed.map(u => u.id), feed}
      };*/
      const feed: Feed = action.payload;
      return{
        ...state,
        feed: [...state.feed, feed]
      }

    }
    case feedAction.LOAD_FEED_FAIL: {
      return{
        ...state,
        feed: []
      }
    }
    default: {
      return state
    };
  }
}

export const getFeed = (state: State) => state.feed;
