import { SearchActionType, SearchActions, SearchState } from './types';

const initialState: SearchState = {
  query: '',
  emptyResult: true,
  globalSearchResult: {
    artist: {
      images: [],
      name: '',
      genres: [],
      id: '',
    },
    tracks: [],
  },
};

export function searchReducer(state = initialState, action: SearchActions): SearchState {
  switch (action.type) {
    case SearchActionType.makingUserSearchSuccess: {
      return {
        ...state,
        query: action.query,
        emptyResult: action.isEmptyResult,
      };
    }
    case SearchActionType.makingUserSearchFailed: {
      return {
        ...state,
        query: '',
        emptyResult: true,
      };
    }
    case SearchActionType.gettingArtistSuccess: {
      return {
        ...state,
        globalSearchResult: {
          ...state.globalSearchResult,
          artist: action.data,
        },
      };
    }
    case SearchActionType.artistTracksSearchingSuccess: {
      return {
        ...state,
        globalSearchResult: {
          ...state.globalSearchResult,
          tracks: action.data,
        },
      };
    }
    case SearchActionType.artistSearchClearing: {
      return {
        ...state,
        globalSearchResult: {
          artist: {
            images: [],
            name: '',
            genres: [],
            id: '',
          },
          tracks: [],
        },
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './types';
