import { SessionState, SessionActions, SessionActionType } from './types';

const initialState: SessionState = {
  userData: {
    display_name: '',
    previewUrl: '',
  },
  loading: false,
};

export function sessionReducer(state = initialState, action: SessionActions): SessionState {
  switch (action.type) {
    case SessionActionType.getUserDataSuccess: {
      return {
        ...state,
        userData: action.data,
      };
    }
    case SessionActionType.getUserDataFailed: {
      return {
        ...state,
        userData: {
          display_name: '',
          previewUrl: '',
        },
      };
    }
    case SessionActionType.setLoadingStatus: {
      return {
        ...state,
        loading: action.load,
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './types';
