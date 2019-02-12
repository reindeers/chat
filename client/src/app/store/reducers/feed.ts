import {Feed, FeedStatus} from "../../model/Feed";
import * as feedAction from '../actions/feed';

export interface State {
  feed: Feed[];
}

export const initialState: State = {
  feed: [
    {
      id: 0, author: "Вася", authorId: 0, status: FeedStatus.ACTIVE,
      content: "Всем привет", createdAt: new Date()
    },
    {
      id: 1, author: "Петя", authorId: 1, status: FeedStatus.ACTIVE,
      content: "Всем привет0", createdAt: new Date()
    },
    {
      id: 2, author: "админ", authorId: 2, status: FeedStatus.DELETED,
      content: "Всем привет1", createdAt: new Date()
    }
  ]
};

export function reducer(state = initialState, action: feedAction.Action) : State{
  switch(action.type){
    case feedAction.ADD_ONE:
    case feedAction.ADD_ONE_SUCCESS:
    case feedAction.EDIT_ONE:
    case feedAction.EDIT_ONE_SUCCESS:
    case feedAction.DELETE_ONE:
    case feedAction.DELETE_ONE_SUCCESS:
    case feedAction.RECOVER_ONE:
    case feedAction.RECOVER_ONE_SUCCESS: {
      return{
        ...state
      };
    }
    case feedAction.LOAD_FEED_SUCCESS: {
      const feed: Feed = action.payload;

      return{
        ...state,
        feed: state.feed.filter(x => x.id == feed.id).length > 0
          ? state.feed.map(f => {
            if (f.id == feed.id) return feed;
            else return f;
          })
          : [...state.feed, feed]
      }

    }
    default: {
      return state
    };
  }
}

export const getFeed = (state: State) => state.feed;
