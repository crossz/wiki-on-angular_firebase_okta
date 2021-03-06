import { Page, Opts } from '../domain/entities';
import { 
  ADD_TODO, 
  FETCH_FROM_API,
  UPDATE_COLLECTIONID_OPTS,
  UPDATE_SLUG_OPTS,
  UPDATE_OPTS
} from '../actions/page.action';
import { CustomAction } from '../actions/page.customaction';

export function pageReducer (state: Page[] =[], action: CustomAction) {
  switch (action.type) {
    case ADD_TODO:
      return [
          ...state,
          action.payload
          ];
    case FETCH_FROM_API:
      return [
        ...action.payload
      ];
    default:
      return state;
  }
}

export function optsReducer (state: Opts = {'projectId': '', 'slug': ''}, action: CustomAction) {
  switch (action.type) {
    case UPDATE_COLLECTIONID_OPTS:
        state.projectId = action.payload
      return state
    case UPDATE_SLUG_OPTS:
      state.slug = action.payload
      return state
    case UPDATE_OPTS:
      return action.payload
    default:
      return state;
  }
}
